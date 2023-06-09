using AutoMapper;
using Commerce.Api.BaseResponses;
using Commerce.Data;
using Commerce.Data.Entites;
using Commerce.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.ProductApi.Command;

public static class UpdateProduct
{
    public record Request : ProductFormModel, IRequest<Unit> { }

    public class Handler : IRequestHandler<Request, Unit>
    {
        private readonly IStorageService _storage;
        private readonly CommerceDbContext _db;
        private readonly IMapper _mapper;

        public Handler(CommerceDbContext db, IStorageService storage, IMapper mapper)
        {
            _db = db;
            _storage = storage;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var product = _db.Products
                .Include(p => p.Images)
                .Include(p => p.Options)
                .Include(p => p.Variants!)
                .ThenInclude(v => v.Attributes)
                .FirstOrDefault(p => p.Id == request.Id);

            product = product ?? throw new Exception($"product cannot be found. ProductId: {request.Id}");

            await ProcessImages(product, request, cancellationToken);

            _mapper.Map(request, product, opts => opts.Items["folder"] = request.Slug);

            await _db.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task ProcessImages(Product product, Request request, CancellationToken cancellationToken)
        {
            if (request.ImageFiles?.Length > 0)
            {
                await _storage.UploadBatchAsync(request.Slug, request.ImageFiles, cancellationToken);
            }

            var currentFileNames = product.Images?.Select(img => img.FileName).ToList();
            var newFileNames = request.Images?.Select(img => img.FileName).ToList();

            await RemoveImages(product.Slug, currentFileNames, newFileNames ?? new List<string>());

            if (product.Slug != request.Slug && product.Images?.Count > 0)
            {
                await MoveImages(product.Slug, request.Slug, product.Images.Select(img => img.FileName).ToList());
            }
        }

        private async Task RemoveImages(string folder, List<string>? currentImages, List<string> newImages)
        {
            if (currentImages?.Count <= 0) return;

            var imagesToDelete = currentImages!.Except(newImages).Select(file => $"{folder}/{file}").ToList();

            if (imagesToDelete?.Count > 0)
            {
                await _storage.DeleteBatchAsync(imagesToDelete);
            }
        }

        private async Task MoveImages(string oldSlug, string newSlug, List<string> fileNames)
        {
            foreach (var file in fileNames)
            {
                await _storage.RenameAsync($"{newSlug}/{file}", $"{oldSlug}/{file}");
            }
        }
    }
}