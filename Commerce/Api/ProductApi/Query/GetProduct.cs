using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Query;
public static class GetProduct
{
    public record Request : IRequest<Response>
    {
        public int ProductId { get; set; }
    }

    public record Response
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public string? Slug { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db)
        {
            _db = db;
        }

        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId, cancellationToken);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.ProductId}");

            return new Response
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Slug = product.Slug
            };
        }
    }
}