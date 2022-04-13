using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Application.Dtos;
using Pagination.Models;

namespace Application.Contracts
{
    public interface IProductApplication
    {
        Task<ProductDto> AddAsync(ProductDto DtoView);
        Task<ProductDto> GetByIdAsync(int id);
        Task<ProductDto> UpdateAsync(ProductDto DtoView);
        Task<bool> DeleteAsync(int id);
        Task<PageListDto> GetAllAsync(Params Params);

    }
}