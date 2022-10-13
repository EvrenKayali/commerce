using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using Commerce.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Command;

public static class UpdateProduct
{
    public record Request : ProductFormModel, IRequest<Unit> { }

    public class Handler : IRequestHandler<Request, Unit>
    {
        private readonly IStorageService _storage;
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db, IStorageService storage)
        {
            _db = db;
            _storage = storage;
        }

        public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = _db.Products
                .Include(p => p.Images)
                .Include(p => p.Options)
                .Include(p => p.Variants)
                .FirstOrDefault(p => p.Id == request.Id);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.Id}");

            await ProcessImages(product, request, cancellationToken);

            var productImages = request.Images != null ? request.Images
                .Select(img => new ProductImage
                {
                    FileName = img.FileName,
                    Folder = request.Slug,
                    Order = img.Order
                }).ToList() : new List<ProductImage>();

            product.Title = request.Title!;
            product.Description = request.Description!;
            product.Slug = request.Slug;
            product.Images = productImages;
            product.Options = request.Options?.Select(o => new Data.Entites.ProductOption { Name = o.Name, Values = string.Join(",", o.Values) }).ToList();
            product.Variants = request.Variants?.Select(v => new ProductVariant { Name = v.Name, Key = v.Key, ImgSrc = v.ImgSrc }).ToList();

            await _db.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task ProcessImages(Product product, Request request, CancellationToken cancellationToken)
        {
            if (request.ImageFiles?.Length > 0)
            {
                await _storage.UploadBatchAsync(request.Slug, request.ImageFiles, cancellationToken);
            }

            var currentFileNames = product.Images?.Select(img => img.FileName).ToList();
            var newFileNames = request.Images?.Select(img => img.FileName).ToList();

            await RemoveImages(product.Slug, currentFileNames, newFileNames ?? new List<string>());

            if (product.Slug != request.Slug && product.Images?.Count > 0)
            {
                await MoveImages(product.Slug, request.Slug, product.Images.Select(img => img.FileName).ToList());
            }
        }

        private async Task RemoveImages(string folder, List<string>? currentImages, List<string> newImages)
        {
            if (currentImages?.Count <= 0) return;

            var imagesToDelete = currentImages!.Except(newImages).Select(file => $"{folder}/{file}").ToList();

            if (imagesToDelete?.Count > 0)
            {
                await _storage.DeleteBatchAsync(imagesToDelete);
            }
        }

        private async Task MoveImages(string oldSlug, string newSlug, List<string> fileNames)
        {
            foreach (var file in fileNames)
            {
                await _storage.RenameAsync($"{newSlug}/{file}", $"{oldSlug}/{file}");
            }
        }
    }
}