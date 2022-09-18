using Commerce.Data;
using MediatR;
using Commerce.Data.Entites;

namespace Commerce.Api.ProductApi.Command;

public static class AddProduct
{
    public record Request : IRequest<Unit>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Folder { get; set; }
        public string? Slug { get; set; }
    }

    public class Handler : IRequestHandler<Request, Unit>
    {
        private readonly CommerceDbContext _db;

        public Handler(CommerceDbContext db)
        {
            _db = db;
        }
        public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Title = request.Title!,
                Description = request.Description!,
                MediaFolder = request.Folder!,
                Slug = request.Slug!
            };

            await _db.Products.AddAsync(product, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}