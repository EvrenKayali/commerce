using Commerce.Data.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Commerce.Data;

public class CommerceDbContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductOption> ProductOptions => Set<ProductOption>();
    public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();

    public CommerceDbContext(DbContextOptions<CommerceDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CommerceDbContext).Assembly);

        var allProps = modelBuilder.Model
            .GetEntityTypes()
            .SelectMany(et => et.GetProperties()).ToList();

        foreach (var property in allProps)
        {
            var propertyType = Nullable.GetUnderlyingType(property.ClrType)! ?? property.ClrType;

            // Enum to string
            if (propertyType.IsEnum)
            {
                var converterType = typeof(EnumToStringConverter<>).MakeGenericType(propertyType);
                var converter = (ValueConverter)Activator.CreateInstance(converterType, (object?)null)!;
                property.SetValueConverter(converter);
            }

            // Decimal properties need these set explicitly
            // Via https://stackoverflow.com/a/43282620/146656
            if (propertyType == typeof(decimal))
            {
                property.SetPrecision(18);
                property.SetScale(2);
            }
        }

        base.OnModelCreating(modelBuilder);
    }
}