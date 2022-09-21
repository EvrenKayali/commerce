
namespace Commerce.Api.BaseResponses;
public record ProductBaseResponse(int Id, string Title, string Description, string Slug, List<ProductImageBaseResponse>? Images);

public record ProductImageBaseRequest(string FileName, int Order);

public record ProductImageBaseResponse(int Id, string Src, string FileName);