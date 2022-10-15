using AutoMapper;
using Commerce.Data.Entites;
using Commerce.Api.BaseResponses;

namespace Commerce.Api.ProductApi;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductBaseModel>();

        CreateMap<ProductFormModel, Product>()
            .ForMember(m => m.Images, s => s.Ignore())
            .ReverseMap()
            .ForPath(p => p.Images, s => s.Ignore());

        CreateMap<BaseResponses.ProductOption, Data.Entites.ProductOption>()
            .ForMember(m => m.Values, src => src.MapFrom(p => string.Join(",", p.Values)))
            .ReverseMap()
            .ForMember(m => m.Values, src => src.MapFrom(p => p.Values.Split(",", StringSplitOptions.None)));

        CreateMap<Variant, ProductVariant>()
        .ReverseMap();

        CreateMap<BaseResponses.VariantAttribute, Data.Entites.VariantAttribute>()
        .ReverseMap();
    }
}