namespace Commerce.Data.Entites;

public class ProductOption
{
    public Product Product { get; set; } = null!;
    public int ProductId { get; set; }
    public string Name { get; set; } = null!;
    public string Values { get; set; } = null!;
}