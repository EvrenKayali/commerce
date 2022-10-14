namespace Commerce.Data.Entites;
public class ProductVariant
{
    public long Id { get; set; }
    public Product Product { get; set; } = null!;
    public string Key { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? ImgSrc { get; set; }
    public ICollection<VariantAttribute>? Attributes { get; set; }
}