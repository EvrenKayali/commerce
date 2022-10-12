using Commerce.Data.Entites;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Data.EntityConfigurations;

public class ProductOptionEntityConfiguration : IEntityTypeConfiguration<ProductOption>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<ProductOption> builder)
    {
        builder.HasKey(i => new { i.ProductId, i.Name });

        builder.HasOne(p => p.Product)
        .WithMany(x => x.Options)
        .OnDelete(DeleteBehavior.Cascade)
        .HasForeignKey(x => x.ProductId);
    }
}