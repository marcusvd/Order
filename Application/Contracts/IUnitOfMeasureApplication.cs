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
        Task<bool> DeleteAsync(int id, UnitOfMeasureDto DtoView);
        PageListDto PgDto { get; set; }
    }
}