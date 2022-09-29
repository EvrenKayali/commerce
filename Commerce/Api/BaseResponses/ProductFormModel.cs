namespace Commerce.Api.BaseResponses;

public record ProductFormModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Slug { get; set; }
    public List<ProductImageBase>? Images { get; set; }
    public IFormFile[]? ImageFiles { get; set; }

}