using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dtos;

namespace Application.Contracts
{
    public interface ICategoryApplication
    {
        Task<CategoryDto> AddAsync(CategoryDto DtoView);
        Task<CategoryDto> EditAsync(int id, CategoryDto DtoView);
        Task<List<CategoryDto>> GetAllAsync();
        Task<bool> DeleteAsync(int id, CategoryDto DtoView);
        PageListDto PgDto { get; set; }
    }
}