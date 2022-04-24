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


        public async Task<CategoryDto> GetByIdAsync(int id)
        {
            try
            {
                if (id == 0) return null;

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

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                if (id == 0) throw new Exception("Is null.");

                var fromDb = await _WORKER.CAT_REPO.GetAById(_id => _id.Id == id);

                if (fromDb == null) throw new Exception("Sorry, null.");

                _WORKER.CAT_REPO.Delete(fromDb);

                await _WORKER.PRO_REPO.Save();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: Camada de aplicação, {ex.Message}");
            }
        }

        public async Task<CategoryDto> UpdateAsync(CategoryDto DtoView)
        {
            try
            {
                var fromDb = await _WORKER.CAT_REPO.GetCategoryByIdAsync(DtoView.Id, true);

                if (fromDb == null) return null;

                _MAP.Map(DtoView, fromDb);

                var DtoToDomainToUpdate = _MAP.Map<Category>(fromDb);

                _WORKER.CAT_REPO.Update(DtoToDomainToUpdate);

                var result = await _WORKER.CAT_REPO.Save();

                if (result)
                {
                    var ReturnUpdated = await _WORKER.CAT_REPO.GetAById(_id => _id.Id == DtoView.Id);
                    var DomainToDtoUpdated = _MAP.Map<CategoryDto>(ReturnUpdated);
                    return DomainToDtoUpdated;
                }
                throw new Exception($"Error update update layer");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public Task<bool> DeleteAsync(int id, CategoryDto DtoView)
        {
            throw new NotImplementedException();
        }
    }
}