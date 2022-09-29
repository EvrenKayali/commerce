namespace Commerce.Api.BaseResponses;

public record ProductImageBase
{
    public int Id { get; set; }
    public string? Src { get; set; }
    public string FileName { get; set; } = null!;
    public int Order { get; set; }
}