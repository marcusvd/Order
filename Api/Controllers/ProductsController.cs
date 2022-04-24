using System;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var returnFromDb = await _IPROD_APPLICATION.GetByIdAsync(id);
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro productController: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveOne(int id)
        {
            try
            {
                if (id == 0) throw new Exception("id is not true.");

                bool resultDel = await _IPROD_APPLICATION.DeleteAsync(id);
                if (resultDel) return Ok(true);
                return Ok(false);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro productController: {ex.Message}");
            }

        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductDto ViewDto)
        {
            try
            {
                if (id != ViewDto.Id) return BadRequest("Id that was indicated for update don't equal of the viewDto");
                if (id == 0) return NoContent();
                return Ok(await _IPROD_APPLICATION.UpdateAsync(ViewDto));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }







    }
}