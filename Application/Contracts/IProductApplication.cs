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
       // Task<List<ProductDto>> GetAllAsync(Params Params);
        Task<bool> DeleteAsync(int id);
        //PageListDto PgDto { get; set; }
        Task<PageListDto> GetAllAsync(Params Params);
 //       Task<PageListDto> SearchPg<Type>(int pgNumber, int pgSize);
      //  int GetAmountRecords();

    }
}