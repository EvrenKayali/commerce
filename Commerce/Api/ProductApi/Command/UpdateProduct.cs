using Azure.Storage.Blobs;
using Commerce.Data;
using Commerce.Data.Entites;
using MediatR;

namespace Commerce.Api.ProductApi.Command;

public static class UpdateProduct
{
    public record Request : IRequest<Unit>
    {

    }

}