using Azure.Storage.Blobs;
using MediatR;

namespace Commerce.Api.ProductApi.Command;
public static class UploadProductImages
{
    public record Request : IRequest<Unit>
    {
        public IFormFile[]? Images { get; set; }
    }

    public class Handler : IRequestHandler<Request, Unit>
    {
        private readonly BlobServiceClient _blobServiceClient;

        public Handler(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

        public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            var container = _blobServiceClient.GetBlobContainerClient("products");
            await container.CreateIfNotExistsAsync(cancellationToken: cancellationToken);

            if (request.Images?.Length > 0)
            {
                foreach (var image in request.Images)
                {
                    using var stream = new MemoryStream();
                    await image.CopyToAsync(stream, cancellationToken);
                    stream.Position = 0;
                    var blobClient = container.GetBlobClient($"title/{image.FileName}");
                    await blobClient.UploadAsync(stream, true, cancellationToken);
                }
            }

            return Unit.Value;
        }
    }

}