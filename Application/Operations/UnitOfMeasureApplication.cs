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
                _WORKER.UNITOFMEASURE_REPO.Add(ViewToRecord);

                if (await _WORKER.CAT_REPO.Save())
                {
                    UnitOfMeasure RecordFromDb = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == ViewToRecord.Id);
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
                List<UnitOfMeasure> fromDb = await _WORKER.UNITOFMEASURE_REPO.GeAllCategories();
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

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                if (id == 0) return false;

                UnitOfMeasure fromDb = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == id);

                if (fromDb == null) return false;

                _WORKER.UNITOFMEASURE_REPO.Delete(fromDb);
                if (await _WORKER.UNITOFMEASURE_REPO.Save())
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }


        public async Task<UnitOfMeasureDto> GetByIdAsync(int id)
        {
            try
            {
                UnitOfMeasure fromDb = await _WORKER.UNITOFMEASURE_REPO.GetByIdAsync(id);
                if (fromDb == null) return null;

                UnitOfMeasureDto unitOfMeasure = _MAP.Map<UnitOfMeasureDto>(fromDb);

                return unitOfMeasure;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }

        public async Task<UnitOfMeasureDto> UpdateAsync(UnitOfMeasureDto DtoView)
        {
            try
            {
                var fromDb = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == DtoView.Id);
                if (fromDb == null) return null;

                var DtoToDomainToUpdate = _MAP.Map<UnitOfMeasure>(DtoView);
                _WORKER.UNITOFMEASURE_REPO.Update(DtoToDomainToUpdate);

                var result = await _WORKER.UNITOFMEASURE_REPO.Save();

                if (result)
                {
                    var ReturnUpdated = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == DtoView.Id);
                    var DomainToDtoUpdated = _MAP.Map<UnitOfMeasureDto>(ReturnUpdated);
                    return DomainToDtoUpdated;
                }
                throw new Exception($"Error update update layer");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }
    }
}