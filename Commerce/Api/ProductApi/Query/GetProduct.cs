using AutoMapper;
using AutoMapper.QueryableExtensions;
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
        private readonly IMapper _mapper;

        public Handler(CommerceDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductFormModel> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = await _db.Products
                .Include(p => p.Images)
                .Include(p => p.Options)
                .Include(p => p.Variants)
                .Where(p => p.Id == request.ProductId)
                .ProjectTo<ProductFormModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.ProductId}");

            var srcPrefix = "http://127.0.0.1:10000/devstoreaccount1/products";

            var images = product.Images?
                .OrderBy(img => img.Order)
                .Select(p => new ProductImageBase { Id = p.Id, Src = $"{srcPrefix}/{p.Folder}/{p.FileName}", FileName = p.FileName })
                .ToList();

            product.Images = images;

            return product;
        }
    }
}