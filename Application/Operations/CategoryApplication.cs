using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using UnitOfWork.Contracts;
using AutoMapper;
using Domain.Entities;
using Pagination.Models;

namespace Application.Operations
{
    public class CategoryApplication : ICategoryApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        public PageListDto PgDto { get; set; }

        public CategoryApplication(IUnitOfWork WORKER, IMapper MAP)
        {
            _WORKER = WORKER;
            _MAP = MAP;
        }
        public async Task<CategoryDto> AddAsync(CategoryDto DtoView)
        {
            try
            {
                if (DtoView == null) return null;

                Category ViewToRecord = _MAP.Map<Category>(DtoView);
                _WORKER.CAT_REPO.Add(ViewToRecord);

                if (await _WORKER.CAT_REPO.Save())
                {
                    Category RecordFromDb = await _WORKER.CAT_REPO.GetAById(_id => _id.Id == ViewToRecord.Id);
                    CategoryDto ViewDtoToReturn = _MAP.Map<CategoryDto>(RecordFromDb);
                    return ViewDtoToReturn;
                }
                return DtoView;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: Camada Aplicação {ex.Message}");
            }
        }


        public async Task<List<CategoryDto>> GetAllAsync()
        {
            try
            {
                List<Category> fromDb = await _WORKER.CAT_REPO.GeAllCategoriesAsync(true);
                if (fromDb == null) return null;

                List<CategoryDto> CatList = _MAP.Map<List<CategoryDto>>(fromDb);

                if (fromDb == null) return null;

                return CatList;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }

        public Task<bool> DeleteAsync(int id, CategoryDto Entiry)
        {
            throw new System.NotImplementedException();
        }

        public Task<CategoryDto> EditAsync(int id, CategoryDto Entiry)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CategoryDto> GetByIdAsync(int id)
        {
            try
            {
                if(id == 0) return null;

                Category catFromDb = await _WORKER.CAT_REPO.GetCategoryByIdAsync(id, true);

                var catDto = _MAP.Map<CategoryDto>(catFromDb);

                if (catDto == null) return null;

                return catDto;

            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: Camada de aplicação, {ex.Message}");
            }
        }
    }
}