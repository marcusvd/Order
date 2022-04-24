using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dtos;

namespace Application.Contracts
{
    public interface IUnitOfMeasureApplication
    {
        Task<UnitOfMeasureDto> AddAsync(UnitOfMeasureDto DtoView);
        Task<UnitOfMeasureDto> GetByIdAsync(int id);
        Task<List<UnitOfMeasureDto>> GetAllAsync();
        Task<UnitOfMeasureDto> UpdateAsync(UnitOfMeasureDto DtoView);
        Task<bool> DeleteAsync(int id);
        PageListDto PgDto { get; set; }
    }
}