using Commerce.Api.BaseResponses;
using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Query;
public static class GetProduct
{
    public record Request : IRequest<ProductFormModel>
    {
        public int ProductId { get; set; }
    }

    public class Handler : IRequestHandler<Request, ProductFormModel>
    {
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db)
        {
            _db = db;
        }

        public async Task<ProductFormModel> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = await _db.Products
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == request.ProductId, cancellationToken);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.ProductId}");

            var srcPrefix = "http://127.0.0.1:10000/devstoreaccount1/products";

            var images = product.Images?
                .OrderBy(img => img.Order)
                .Select(p => new ProductImageBase { Id = p.Id, Src = $"{srcPrefix}/{p.Folder}/{p.FileName}", FileName = p.FileName })
                .ToList();

            return new ProductFormModel
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Slug = product.Slug,
                Images = images
            };
        }
    }
}