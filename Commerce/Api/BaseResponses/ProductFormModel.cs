namespace Commerce.Api.BaseResponses;

public record ProductOption
{
    public string Name { get; set; } = null!;
    public string[] Values { get; set; } = null!;
}

public record Variant
{
    public long Id { get; set; }
    public string Name { get; set; } = null!;
    public string Key { get; set; } = null!;
    public string? ImgSrc { get; set; }
}

public record ProductFormModel
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public List<ProductImageBase>? Images { get; set; }
    public IFormFile[]? ImageFiles { get; set; }
    public List<ProductOption>? Options { get; set; }
    public List<Variant>? Variants { get; set; }
}