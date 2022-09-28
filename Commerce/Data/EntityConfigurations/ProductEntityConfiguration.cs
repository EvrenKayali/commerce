using Commerce.Data.Entites;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Data.EntityConfigurations;

public class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Title)
        .HasMaxLength(200);

        builder.HasIndex(p => p.Title)
        .IsUnique();
    }
}