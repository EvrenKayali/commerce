namespace Commerce.Data.Entites;

public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string MediaFolder { get; set; } = null!;
    public string Slug { get; set; } = null!;
}