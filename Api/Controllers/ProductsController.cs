using System;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;

namespace Api.Controllers
{
    // [AllowAnonymous]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductApplication _IPROD_APPLICATION;
        public ProductsController(IProductApplication IPROD_APPLICATION)
        {
            _IPROD_APPLICATION = IPROD_APPLICATION;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductDto ViewDto)
        {
            try
            {
                if (ViewDto == null) return null;
                ProductDto returnFromDb = await _IPROD_APPLICATION.AddAsync(ViewDto);
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Params Params)
        {
            try
            {
                PageListDto returnFromDb = await _IPROD_APPLICATION.GetAllAsync(Params);
                if (returnFromDb == null) return null;

                Response.AddPagination(returnFromDb.CurrentPg,
                                       returnFromDb.PgSize,
                                       returnFromDb.TotalCount,
                                       returnFromDb.TotalPgs,
                                       returnFromDb.HasNext,
                                       returnFromDb.HasPrevious);
                return Ok(returnFromDb.Products);

            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }

        // [HttpGet("pagination")]
        // public async Task<IActionResult> SearchPagination(int pg = 1, int record = 5)
        // {
        //     PageListDto search = await _IPROD_APPLICATION.SearchPg<ProductDto>(pg, record);
        //     if (search == null)
        //     {
        //         return NoContent();
        //     }

        //     int amountRecords = _IPROD_APPLICATION.GetAmountRecords();
        //     int pgAmount = ((int)Math.Ceiling((double)amountRecords / record));

        //     return Ok(search.Products);
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveOne(int id)
        {
            if (id == 0) throw new Exception("id is not true.");

            bool resultDel = await _IPROD_APPLICATION.DeleteAsync(id);
            if (resultDel) return Ok(true);
            return Ok(false);
        }


    }
}