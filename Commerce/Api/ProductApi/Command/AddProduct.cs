using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using Commerce.Services;
using MediatR;

namespace Commerce.Api.ProductApi.Command;
public static class AddProduct
{

    public record Request : ProductFormModel, IRequest<Response> { }

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
                Slug = request.Slug,
                Images = productImages,
                Options = request.Options?.Select(o => new Data.Entites.ProductOption { Name = o.Name, Values = string.Join(",", o.Values) }).ToList(),
                Variants = request.Variants?.Select(v => new ProductVariant { Name = v.Name, Key = v.Key, ImgSrc = v.ImgSrc }).ToList()
            };

            await _db.Products.AddAsync(product, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);

            return new Response { Id = product.Id };
        }
    }
}