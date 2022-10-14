namespace Commerce.Data.Entites;

public class VariantAttribute
{
    public ProductVariant Variant { get; set; } = null!;
    public long VariantId { get; set; }
    public string Name { get; set; } = null!;
    public string Value { get; set; } = null!;
}