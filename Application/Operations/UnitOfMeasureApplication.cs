using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using UnitOfWork.Contracts;
using AutoMapper;
using Domain.Entities;

namespace Application.Operations
{
    public class UnitOfMeasureApplication : IUnitOfMeasureApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        public PageListDto PgDto { get; set; }

        public UnitOfMeasureApplication(IUnitOfWork WORKER, IMapper MAP)
        {
            _WORKER = WORKER;
            _MAP = MAP;
        }
        public async Task<UnitOfMeasureDto> AddAsync(UnitOfMeasureDto DtoView)
        {
            try
            {
                if (DtoView == null) return null;

                UnitOfMeasure ViewToRecord = _MAP.Map<UnitOfMeasure>(DtoView);
                _WORKER.UMEASURE_REPO.Add(ViewToRecord);

                if (await _WORKER.CAT_REPO.Save())
                {
                    UnitOfMeasure RecordFromDb = await _WORKER.UMEASURE_REPO.GetAById(_id => _id.Id == ViewToRecord.Id);
                    UnitOfMeasureDto ViewDtoToReturn = _MAP.Map<UnitOfMeasureDto>(RecordFromDb);
                    return ViewDtoToReturn;
                }
                return DtoView;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: Camada Aplicação {ex.Message}");
            }
        }


        public async Task<List<UnitOfMeasureDto>> GetAllAsync()
        {
            try
            {
                List<UnitOfMeasure> fromDb = await _WORKER.UMEASURE_REPO.GeAllCategories();
                if (fromDb == null) return null;

                List<UnitOfMeasureDto> CatList = _MAP.Map<List<UnitOfMeasureDto>>(fromDb);

                if (fromDb == null) return null;

                return CatList;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }

        public Task<bool> DeleteAsync(int id, UnitOfMeasureDto Entiry)
        {
            throw new System.NotImplementedException();
        }

        public Task<UnitOfMeasureDto> EditAsync(int id, UnitOfMeasureDto Entiry)
        {
            throw new System.NotImplementedException();
        }


    }
}