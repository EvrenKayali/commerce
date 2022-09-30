namespace Commerce.Api.BaseResponses;

public record ProductFormModel
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public List<ProductImageBase>? Images { get; set; }
    public IFormFile[]? ImageFiles { get; set; }
}