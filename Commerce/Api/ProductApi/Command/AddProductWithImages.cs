using Azure.Storage.Blobs;
using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using MediatR;

namespace Commerce.Api.ProductApi.Command;
public static class AddProductWithImgages
{

    public record Request : IRequest<Response>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Slug { get; set; }
        public IFormFile[]? ImageFiles { get; set; }
        public List<ProductImageBaseRequest>? Images { get; set; }
    }

    public record Response
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly BlobServiceClient _blobServiceClient;

        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db, BlobServiceClient blobServiceClient)
        {
            _db = db;
            _blobServiceClient = blobServiceClient;
        }
        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            await UploadImages(request.Slug!, request.ImageFiles, cancellationToken);

            var productImages = request.Images?
                .Select(img => new ProductImage
                {
                    FileName = img.FileName,
                    Folder = request.Slug!,
                    Order = img.Order
                }).ToList();

            var product = new Product
            {
                Title = request.Title!,
                Description = request.Description!,
                Slug = request.Slug!,
                Images = productImages
            };

            await _db.Products.AddAsync(product, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);

            return new Response { Id = product.Id };
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