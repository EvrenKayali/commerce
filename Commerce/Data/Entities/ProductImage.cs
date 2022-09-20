namespace Commerce.Data.Entites;
public class ProductImage
{
    public int Id { get; set; }
    public string Folder { get; set; } = null!;
    public string FileName { get; set; } = null!;
    public int Order { get; set; }
    public Product Product { get; set; } = null!;
}