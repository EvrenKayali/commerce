using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Query;
public static class GetProducts
{
    public record Request : IRequest<List<Response>> { }

    public record Response(int Id, string Title, string Description, string Slug);

    public class Handler : IRequestHandler<Request, List<Response>>
    {
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db)
        {
            _db = db;
        }

        public async Task<List<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            return await _db.Products.Select(p => new Response(p.Id, p.Title, p.Description, p.Slug)).ToListAsync(cancellationToken);
        }
    }
}