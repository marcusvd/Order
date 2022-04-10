using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dtos;

namespace Application.Contracts
{
    public interface ISubCategoryApplication
    {
        Task<SubCategoryDto> GetById(int id);
        Task<List<SubCategoryDto>> GetAllAsync();
       
    }
}