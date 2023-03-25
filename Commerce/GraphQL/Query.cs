using Commerce.Data;
using Commerce.Data.Entites;

namespace Commerce.GraphQL;

[QueryType]
public static class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Product> GetProducts(CommerceDbContext context)
    {
        return context.Products;
    }

}