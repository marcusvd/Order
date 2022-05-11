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
    public class MeasureApplication : IMeasureApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        public PageListDto PgDto { get; set; }

        public MeasureApplication(IUnitOfWork WORKER, IMapper MAP)
        {
            _WORKER = WORKER;
            _MAP = MAP;
        }
        public async Task<MeasureDto> AddAsync(MeasureDto DtoView)
        {
            try
            {
                if (DtoView == null) return null;

                Measure ViewToRecord = _MAP.Map<Measure>(DtoView);
                _WORKER.UNITOFMEASURE_REPO.Add(ViewToRecord);

                if (await _WORKER.CAT_REPO.Save())
                {
                    Measure RecordFromDb = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == ViewToRecord.Id);
                    MeasureDto ViewDtoToReturn = _MAP.Map<MeasureDto>(RecordFromDb);
                    return ViewDtoToReturn;
                }
                return DtoView;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: Camada Aplicação {ex.Message}");
            }
        }


        public async Task<List<MeasureDto>> GetAllAsync()
        {
            try
            {
                List<Measure> fromDb = await _WORKER.UNITOFMEASURE_REPO.GeAllCategories();
                if (fromDb == null) return null;

                List<MeasureDto> CatList = _MAP.Map<List<MeasureDto>>(fromDb);

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

                Measure fromDb = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == id);

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


        public async Task<MeasureDto> GetByIdAsync(int id)
        {
            try
            {
                Measure fromDb = await _WORKER.UNITOFMEASURE_REPO.GetByIdAsync(id);
                if (fromDb == null) return null;

                MeasureDto Measure = _MAP.Map<MeasureDto>(fromDb);

                return Measure;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }

        public async Task<MeasureDto> UpdateAsync(MeasureDto DtoView)
        {
            try
            {
                var fromDb = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == DtoView.Id);
                if (fromDb == null) return null;

                var DtoToDomainToUpdate = _MAP.Map<Measure>(DtoView);
                _WORKER.UNITOFMEASURE_REPO.Update(DtoToDomainToUpdate);

                var result = await _WORKER.UNITOFMEASURE_REPO.Save();

                if (result)
                {
                    var ReturnUpdated = await _WORKER.UNITOFMEASURE_REPO.GetAById(_id => _id.Id == DtoView.Id);
                    var DomainToDtoUpdated = _MAP.Map<MeasureDto>(ReturnUpdated);
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