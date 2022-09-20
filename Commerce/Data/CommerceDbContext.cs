using Commerce.Data.Entites;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Data;

public class CommerceDbContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();

    public CommerceDbContext(DbContextOptions<CommerceDbContext> options) : base(options) { }
}