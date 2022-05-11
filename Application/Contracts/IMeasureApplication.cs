using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dtos;

namespace Application.Contracts
{
    public interface IMeasureApplication
    {
        Task<MeasureDto> AddAsync(MeasureDto DtoView);
        Task<MeasureDto> GetByIdAsync(int id);
        Task<List<MeasureDto>> GetAllAsync();
        Task<MeasureDto> UpdateAsync(MeasureDto DtoView);
        Task<bool> DeleteAsync(int id);
        PageListDto PgDto { get; set; }
    }
}