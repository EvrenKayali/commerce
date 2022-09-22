using Azure.Storage.Blobs;
using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
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
        private readonly BlobServiceClient _blobServiceClient;

        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db, BlobServiceClient blobServiceClient)
        {
            _db = db;
            _blobServiceClient = blobServiceClient;
        }
        public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {

            //await UploadImages(request.Slug!, request.ImageFiles, cancellationToken);

            var productImages = request.Images?
                .Select(img => new ProductImage
                {
                    FileName = img.FileName,
                    Folder = request.Slug!,
                    Order = img.Order
                }).ToList();

            var product = _db.Products
                .Include(p => p.Images)
                .FirstOrDefault(p => p.Id == request.Id);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.Id}");

            product.Title = request.Title!;
            product.Description = request.Description!;
            product.Slug = request.Slug!;
            product.Images = productImages;

            await _db.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task UploadImages(string folderName, IFormFile[]? images, CancellationToken cancellationToken)
        {
            var container = _blobServiceClient.GetBlobContainerClient("products");
            await container.CreateIfNotExistsAsync(cancellationToken: cancellationToken);

            if (images?.Length > 0)
            {
                foreach (var image in images)
                {
                    using var stream = new MemoryStream();
                    await image.CopyToAsync(stream, cancellationToken);
                    stream.Position = 0;
                    var blobClient = container.GetBlobClient($"{folderName}/{image.FileName}");
                    await blobClient.UploadAsync(stream, true, cancellationToken);
                }
            }
        }
    }

}