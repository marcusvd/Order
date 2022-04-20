using System;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Api.Controllers
{
    
     [AllowAnonymous]
    //    (AuthenticationSchemes = "Bearer")
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryApplication _CAT_APPLICATION;
        public CategoriesController(ICategoryApplication CAT_APPLICATION)
        {
            _CAT_APPLICATION = CAT_APPLICATION;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDto ViewDto)
        {
            try
            {
                if (ViewDto == null) return null;
                CategoryDto returnFromDb = await _CAT_APPLICATION.AddAsync(ViewDto);
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var returnFromDb = await _CAT_APPLICATION.GetAllAsync();
                if (returnFromDb == null) return null;
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryByIdAsync(int id)
        {
            try
            {
                var returnFromDb = await _CAT_APPLICATION.GetByIdAsync(id);
                if (returnFromDb == null) return null;
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }
       [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveOne(int id)
        {
            try
            {
                if (id == 0) throw new Exception("id is not true.");

                bool resultDel = await _CAT_APPLICATION.DeleteAsync(id);
                if (resultDel) return Ok(true);
                return Ok(false);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro productController: {ex.Message}");
            }

        }
    }
}