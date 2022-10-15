using AutoMapper;
using AutoMapper.QueryableExtensions;
using Commerce.Api.BaseResponses;
using Commerce.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Query;
public static class GetProducts
{
    public record Request : IRequest<List<ProductBaseModel>> { }



    public class Handler : IRequestHandler<Request, List<ProductBaseModel>>
    {
        private readonly CommerceDbContext _db;
        private readonly IMapper _mapper;

        public Handler(CommerceDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<List<ProductBaseModel>> Handle(Request request, CancellationToken cancellationToken)
        {
            var srcPrefix = "http://127.0.0.1:10000/devstoreaccount1/products";

            return await _db.Products.Include(p => p.Images)
                .ProjectTo<ProductBaseModel>(_mapper.ConfigurationProvider, new { prefix = srcPrefix })
                .ToListAsync(cancellationToken);
        }
    }
}