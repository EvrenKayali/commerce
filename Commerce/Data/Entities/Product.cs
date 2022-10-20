namespace Commerce.Data.Entites;

public enum ProductStatus
{
    Draft,
    Active
}

public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public ProductStatus Status { get; set; } = ProductStatus.Draft;
    public ICollection<ProductImage>? Images { get; set; }
    public ICollection<ProductVariant>? Variants { get; set; }
    public ICollection<ProductOption>? Options { get; set; }
}