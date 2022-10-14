using AutoMapper;
using Commerce.Data.Entites;
using Commerce.Api.BaseResponses;

namespace Commerce.Api.ProductApi;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ProductFormModel, Product>()
            .ForMember(m => m.Images, s => s.Ignore());

        CreateMap<BaseResponses.ProductOption, Data.Entites.ProductOption>()
            .ForMember(m => m.Values, src => src.MapFrom(p => string.Join(",", p.Values)));

        CreateMap<Variant, ProductVariant>();

        CreateMap<BaseResponses.VariantAttribute, Data.Entites.VariantAttribute>();
    }
}