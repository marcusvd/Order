using Application.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.DtoProfiles
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<SubCategory, SubCategoryDto>().ReverseMap();
            CreateMap<UnitOfMeasure, UnitOfMeasureDto>().ReverseMap();


        }
    }
}