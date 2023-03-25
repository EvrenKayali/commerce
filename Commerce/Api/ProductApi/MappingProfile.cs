using AutoMapper;
using Commerce.Data.Entites;
using Commerce.Api.BaseResponses;

namespace Commerce.Api.ProductApi;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        string? prefix = null;

        CreateMap<Product, ProductBaseModel>();

        CreateMap<ProductFormModel, Product>()
            .ReverseMap();

        CreateProjection<Product, ProductFormModel>()
            .ForMember(m => m.Images, src => src.MapFrom(s => s.Images!.OrderBy(i => i.Order)));

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

        CreateProjection<Product, ProductBaseModel>()
            .ForMember(m => m.MainImageSrc, src => src.MapFrom(s => s.Images != null
                ? s.Images.OrderBy(i => i.Order).Select(img => $"{prefix}/{img.Folder}/{img.FileName}").FirstOrDefault()
                : null));
    }
}