using System;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Api.Controllers
{
    //[AllowAnonymous]
    //    (AuthenticationSchemes = "Bearer")
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ISubCategoryApplication _SubCAT_APPLICATION;
        public SubCategoriesController(ISubCategoryApplication SubCAT_APPLICATION)
        {
            _SubCAT_APPLICATION = SubCAT_APPLICATION;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var returnFromDb = await _SubCAT_APPLICATION.GetAllAsync();
                if (returnFromDb == null) return null;
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                if (id == 0) return null;
                SubCategoryDto returnFromDb = await _SubCAT_APPLICATION.GetById(id);
                return Ok(returnFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }



    }
}