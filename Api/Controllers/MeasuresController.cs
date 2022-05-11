using System;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    // (AuthenticationSchemes="Bearer")
    [Authorize]
    // [Authorize(AuthenticationSchemes="Bearer")]
    //[AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class MeasuresController : ControllerBase
    {
        private readonly IMeasureApplication _UNITMEASURE_APPLICATION;
        public MeasuresController(IMeasureApplication UNITMEASURE_APPLICATION)
        {
            _UNITMEASURE_APPLICATION = UNITMEASURE_APPLICATION;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                var returnFromDb = await _UNITMEASURE_APPLICATION.GetAllAsync();
                if (returnFromDb == null) return NoContent();
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MeasureDto ViewDto)
        {
            try
            {
                if (ViewDto == null) return NoContent();
                MeasureDto returnFromDb = await _UNITMEASURE_APPLICATION.AddAsync(ViewDto);
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromBody] MeasureDto ViewDto)
        {
            try
            {
                if (id != ViewDto.Id) return BadRequest("Id that was indicated for update don't equal of the viewDto");
                if (id == 0) return NoContent();
                
                var result = await _UNITMEASURE_APPLICATION.UpdateAsync(ViewDto);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var returnFromDb = await _UNITMEASURE_APPLICATION.GetAllAsync();
                if (returnFromDb == null) return NoContent();
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

                bool resultDel = await _UNITMEASURE_APPLICATION.DeleteAsync(id);

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