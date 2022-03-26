using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using UnitOfWork.Contracts;
using AutoMapper;
using Domain.Entities;
using Pagination.Models;
using Repository.Contracts;

namespace Application.Operations
{
    public class ProductApplication : IProductApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IProductRepository _PRODUCT_REPO;
        private readonly IMapper _MAP;
        public PageListDto PgDto { get; set; }

        public ProductApplication(IUnitOfWork WORKER, IMapper MAP,
         IProductRepository PRODUCT_REPO)
        {
            _WORKER = WORKER;
            _PRODUCT_REPO = PRODUCT_REPO; 
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


            // try
            // {
            //     var fromDb = await _WORKER.PRO_REPO.GetAllProductAsync(Params);

            //     if (fromDb == null) return null;

            //     var ViewDto = _MAP.Map<PagedList<ProductDto>>(fromDb);

            //     ViewDto.CurrentPg = fromDb.CurrentPg;
            //     ViewDto.TotalPgs = fromDb.TotalPgs;
            //     ViewDto.PgSize = fromDb.PgSize;
            //     ViewDto.TotalCount = fromDb.TotalCount;


            //     return PgDto;
            // }
            // catch (Exception ex)
            // {
            //     throw new Exception($"Camada de aplicação: {ex.Message}");
            // }





            try
            {
                var fromDb = await _PRODUCT_REPO.GetAllProductAsync(Params);
               // var fromDb = await _WORKER.PRO_REPO.GetAllProductAsync(Params);

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

        public async Task<bool> DeleteAsync(int id)
        {
            if (id == 0) throw new Exception("Is null.");

            var fromDb = _WORKER.PRO_REPO.GetAById(_id => _id.Id == id);

            if (fromDb == null) throw new Exception("Sorry, null.");

            _WORKER.PRO_REPO.Delete(fromDb.Result);

            await _WORKER.PRO_REPO.Save();

            return true;

        }

        public async Task<ProductDto> GetByIdAsync(int id)
        {
            var fromDb = await _WORKER.PRO_REPO.GetAById(_id => _id.Id == id);

            var DtoView = _MAP.Map<ProductDto>(fromDb);

            if (DtoView == null) throw new Exception("Entity null");
            return DtoView;

        }

        // public async Task<PageListDto> SearchPg<Type>(int pgNumber, int pgSize)
        // {
        //     List<Product> srcPg = await _WORKER.PRO_REPO.SearchPg<Product>(pgNumber, pgSize);

        //     if (srcPg == null) return null;

        //     List<ProductDto> srcPgDto = _MAP.Map<List<ProductDto>>(srcPg);

        //     PageListDto PgLstDto = new PageListDto();
        //     PgLstDto.Products = srcPgDto;
        //     PgLstDto.TotalCount = PgLstDto.TotalCount;
        //     PgLstDto.PgSize = PgLstDto.PgSize;
        //     PgLstDto.CurrentPg = PgLstDto.CurrentPg;
        //     PgLstDto.TotalPgs = PgLstDto.TotalPgs;
        //     PgLstDto.HasNext = PgLstDto.HasNext;
        //     PgLstDto.HasPrevious = PgLstDto.HasPrevious;
        //     return PgLstDto;
        // }

        // public int GetAmountRecords()
        // {
        //     int amount = _WORKER.PRO_REPO.GetAmountRecords();
        //     return amount;
        // }


    }
}