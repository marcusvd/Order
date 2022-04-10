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
    public class SubCategoryApplication : ISubCategoryApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        public PageListDto PgDto { get; set; }

        public SubCategoryApplication(IUnitOfWork WORKER, IMapper MAP)
        {
            _WORKER = WORKER;
            _MAP = MAP;
        }


        public async Task<List<SubCategoryDto>> GetAllAsync()
        {
            try
            {
                List<SubCategory> fromDb = await _WORKER.SUBCAT_REPO.GeAllSubCategories();
                if (fromDb == null) return null;

                List<SubCategoryDto> CatList = _MAP.Map<List<SubCategoryDto>>(fromDb);

                if (fromDb == null) return null;

                return CatList;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }

        public async Task<SubCategoryDto> GetById(int id)
        {
            if (id == 0) throw new Exception("Erro: Dados incorretos, id não confere.");
            try
            {
                SubCategory fromDb = await _WORKER.SUBCAT_REPO.GetById(id);
                if (fromDb == null) return null;

                SubCategoryDto CatList = _MAP.Map<SubCategoryDto>(fromDb);

                if (fromDb == null) return null;

                return CatList;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }
    }
}