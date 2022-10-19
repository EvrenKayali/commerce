using AutoMapper;
using AutoMapper.QueryableExtensions;
using Commerce.Api.BaseResponses;
using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.FrontApi.Query;
public static class GetProduct
{
    public record Request : IRequest<ProductFormModel>
    {
        public string Slug { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Request, ProductFormModel>
    {
        private readonly CommerceDbContext _db;
        private readonly IMapper _mapper;

        public Handler(CommerceDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductFormModel> Handle(Request request, CancellationToken cancellationToken)
        {

            var srcPrefix = "http://127.0.0.1:10000/devstoreaccount1/products";

            var product = await _db.Products
                .Include(p => p.Images)
                .Include(p => p.Options)
                .Include(p => p.Variants)
                .Where(p => p.Slug == request.Slug)
                .ProjectTo<ProductFormModel>(_mapper.ConfigurationProvider, new { prefix = srcPrefix })
                .FirstOrDefaultAsync(cancellationToken);


            product = product ?? throw new Exception($"product cannot be found. slug: {request.Slug}");

            return product;
        }
    }
}