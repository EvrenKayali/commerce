using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Query;
public static class GetProducts
{
    public record Request : IRequest<List<Response>> { }

    public record Response(int Id, string Title, string Description, string Slug, string? MainImageSrc);

    public class Handler : IRequestHandler<Request, List<Response>>
    {
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db)
        {
            _db = db;
        }

        public async Task<List<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            var srcPrefix = "http://127.0.0.1:10000/devstoreaccount1/products";

            return await _db.Products.Include(p => p.Images)
                .Select(p => new Response(p.Id, p.Title, p.Description, p.Slug, p.Images!.FirstOrDefault() != null ? $"{srcPrefix}/{p.Slug}/{p.Images!.First().FileName}" : ""))
                .ToListAsync(cancellationToken);
        }
    }
}