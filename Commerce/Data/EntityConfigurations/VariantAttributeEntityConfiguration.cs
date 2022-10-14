using Commerce.Data.Entites;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Data.EntityConfigurations;

public class VariantAttributeEntityConfiguration : IEntityTypeConfiguration<VariantAttribute>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<VariantAttribute> builder)
    {
        builder.HasKey(i => new { i.VariantId, i.Name, i.Value });

        builder.HasOne(p => p.Variant)
        .WithMany(x => x.Attributes)
        .OnDelete(DeleteBehavior.Cascade)
        .HasForeignKey(x => x.VariantId);
    }
}