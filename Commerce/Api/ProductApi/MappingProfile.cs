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
            .ReverseMap();

        string? prefix = null;

        CreateProjection<ProductImage, ProductImageBase>()
            .ForMember(m => m.Src, opt => opt.MapFrom(src => $"{prefix}/{src.Folder}/{src.FileName}"));

        CreateMap<ProductImageBase, ProductImage>()
            .ForMember(m => m.Folder, s => s.MapFrom((s, d, _, context) => context.Items["folder"]));

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