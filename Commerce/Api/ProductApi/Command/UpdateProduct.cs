using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using Commerce.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Command;

public static class UpdateProduct
{

    public record Request : ProductFormModel, IRequest<Unit>
    {
    }

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
                .FirstOrDefault(p => p.Id == request.Id);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.Id}");

            if (request.ImageFiles?.Length > 0)
                await _storage.UploadBatchAsync(request.Slug!, request.ImageFiles, cancellationToken);


            var productImages = request.Images != null ? request.Images
                .Select(img => new ProductImage
                {
                    FileName = img.FileName,
                    Folder = request.Slug!,
                    Order = img.Order
                }).ToList() : new List<ProductImage>();

            await RemoveImages(product.Slug, product.Images, productImages);

            product.Title = request.Title!;
            product.Description = request.Description!;
            product.Slug = request.Slug!;
            product.Images = productImages;

            await _db.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task RemoveImages(string folder, IEnumerable<ProductImage>? currentImages, IEnumerable<ProductImage> newImages)
        {
            if (currentImages?.Count() <= 0) return;

            var imagesToDelete = currentImages!
            .Select(img => img.FileName)
            .Except(newImages.Select(img => img.FileName))
            .Select(file => $"{folder}/{file}")
            .ToList();

            if (imagesToDelete?.Count > 0)
            {
                await _storage.DeleteBatchAsync(imagesToDelete);
            }
        }
    }

}