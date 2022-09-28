using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using Commerce.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Command;

public static class UpdateProduct
{

    public record Request : IRequest<Unit>
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Slug { get; set; }
        public IFormFile[]? ImageFiles { get; set; }
        public List<ProductImageBaseRequest>? Images { get; set; }
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

            await RemoveImages(product.Images, productImages);

            product.Title = request.Title!;
            product.Description = request.Description!;
            product.Slug = request.Slug!;
            product.Images = productImages;

            await _db.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task RemoveImages(IEnumerable<ProductImage>? currentImages, IEnumerable<ProductImage> newImages)
        {
            if (currentImages?.Count() <= 0) return;

            var imagesToDelete = currentImages!
            .Where(img => newImages.Select(i => i.FileName).Contains(img.FileName))
            .Select(x => $"{x.Folder}/{x.FileName}").ToList();

            if (imagesToDelete?.Count > 0)
            {
                await _storage.DeleteBatchAsync(imagesToDelete);
            }
        }
    }

}