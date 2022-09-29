
namespace Commerce.Api.BaseResponses;
//ProductImageBasepublic record ProductBaseResponse(int Id, string Title, string Description, string Slug, List<ProductImageBaseResponse>? Images);

public record ProductImageBase
{
    public int Id { get; set; }
    public string? Src { get; set; }
    public string FileName { get; set; } = null!;
    public int Order { get; set; }
}