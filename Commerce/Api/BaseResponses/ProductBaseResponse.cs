
namespace Commerce.Api.BaseResponses;
public record ProductBaseResponse(int Id, string Title, string Description, string Slug, List<ProductImageBaseResponse>? Images);

public record ProductImageBaseResponse(string Src);