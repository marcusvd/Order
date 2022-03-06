using System;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    // (AuthenticationSchemes="Bearer")
    [Authorize]
   // [Authorize(AuthenticationSchemes="Bearer")]
    //[AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class UnitOfMeasuresController : ControllerBase
    {
        private readonly IUnitOfMeasureApplication _UNITMEASURE_APPLICATION;
        public UnitOfMeasuresController(IUnitOfMeasureApplication UNITMEASURE_APPLICATION)
        {
            _UNITMEASURE_APPLICATION = UNITMEASURE_APPLICATION;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UnitOfMeasureDto ViewDto)
        {
            try
            {
                if (ViewDto == null) return null;
                UnitOfMeasureDto returnFromDb = await _UNITMEASURE_APPLICATION.AddAsync(ViewDto);
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
                var returnFromDb = await _UNITMEASURE_APPLICATION.GetAllAsync();
                if (returnFromDb == null) return null;
                     return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }
    }
}