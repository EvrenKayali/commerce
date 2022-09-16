using Azure.Storage.Blobs;
using MediatR;

namespace Commerce.Api.Product.Command;

public static class AddProduct
{
    public record Request : IRequest<Unit>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
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
            var a = request;
            return Unit.Value;
        }
    }
}