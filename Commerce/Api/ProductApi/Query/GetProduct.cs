using Commerce.Api.BaseResponses;
using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Query;
public static class GetProduct
{
    public record Request : IRequest<ProductBaseResponse>
    {
        public int ProductId { get; set; }
    }

    public class Handler : IRequestHandler<Request, ProductBaseResponse>
    {
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db)
        {
            _db = db;
        }

        public async Task<ProductBaseResponse> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = await _db.Products
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == request.ProductId, cancellationToken);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.ProductId}");
            var srcPrefix = "http://127.0.0.1:10000/devstoreaccount1/products/";

            var images = product.Images?.Select(p => new ProductImageBaseResponse($"{srcPrefix}/{p.Folder}/{p.FileName}")).ToList();

            return new ProductBaseResponse(product.Id, product.Title, product.Description, product.Slug, images);
        }
    }
}