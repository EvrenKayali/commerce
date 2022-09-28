using Azure.Storage.Blobs;
using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using Commerce.Services;
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
        private readonly IStorageService _storage;

        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db, IStorageService storage)
        {
            _db = db;
            _storage = storage;
        }
        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            if (request.ImageFiles?.Length > 0)
                await _storage.UploadBatchAsync(request.Slug!, request.ImageFiles, cancellationToken);

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
    }
}