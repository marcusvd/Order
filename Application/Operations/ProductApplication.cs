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
    public class ProductApplication : IProductApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        public PageListDto PgDto { get; set; }

        public ProductApplication(IUnitOfWork WORKER, IMapper MAP)
        {
            _WORKER = WORKER;
            _MAP = MAP;
        }
        public async Task<ProductDto> AddAsync(ProductDto DtoView)
        {
            try
            {
                if (DtoView == null) return null;

                Product ViewToRecord = _MAP.Map<Product>(DtoView);
                _WORKER.PRO_REPO.Add(ViewToRecord);

                if (await _WORKER.PRO_REPO.Save())
                {
                    Product RecordFromDb = await _WORKER.PRO_REPO.GetAById(_id => _id.Id == ViewToRecord.Id);
                    ProductDto ViewDtoToReturn = _MAP.Map<ProductDto>(RecordFromDb);
                    return ViewDtoToReturn;
                }
                return DtoView;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: Camada Aplicação ex.Message {ex.Message}");
            }
        }

        public async Task<PageListDto> GetAllAsync(Params Params)
        {
            try
            {
                var fromDb = await _WORKER.PRO_REPO.GetAllProductAsync(Params);
                if (fromDb == null) return null;

                List<ProductDto> ViewDto = _MAP.Map<List<ProductDto>>(fromDb);

                PgDto = new PageListDto()
                {
                    TotalCount = fromDb.TotalCount,
                    PgSize = fromDb.PgSize,
                    CurrentPg = fromDb.CurrentPg,
                    TotalPgs = fromDb.TotalPgs,
                    HasNext = fromDb.HasNext,
                    HasPrevious = fromDb.HasPrevious,
                    Products = ViewDto
                };
                return PgDto;
            }
            catch (Exception ex)
            {
                throw new Exception($"Camada de aplicação: {ex.Message}");
            }
        }

        public Task<bool> DeleteAsync(int id, ProductDto Entiry)
        {
            throw new System.NotImplementedException();
        }

        public Task<ProductDto> EditAsync(int id, ProductDto Entiry)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PageListDto> SearchPg<Type>(int pgNumber, int pgSize)
        {
            List<Product> srcPg = await _WORKER.PRO_REPO.SearchPg<Product>(pgNumber, pgSize);

            if (srcPg == null) return null;

            List<ProductDto> srcPgDto = _MAP.Map<List<ProductDto>>(srcPg);

            PageListDto PgLstDto = new PageListDto();
            PgLstDto.Products = srcPgDto;
            PgLstDto.TotalCount = PgLstDto.TotalCount;
            PgLstDto.PgSize = PgLstDto.PgSize;
            PgLstDto.CurrentPg = PgLstDto.CurrentPg;
            PgLstDto.TotalPgs = PgLstDto.TotalPgs;
            PgLstDto.HasNext = PgLstDto.HasNext;
            PgLstDto.HasPrevious = PgLstDto.HasPrevious;
            return PgLstDto;
        }

        public int GetAmountRecords()
        {
            int amount = _WORKER.PRO_REPO.GetAmountRecords();
            return amount;
        }
    }
}