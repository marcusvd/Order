using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repository.Contracts;

namespace OStorage.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Tests : ControllerBase
    {
        public readonly IProductRepository _PRODREPO;
        public Tests(IProductRepository PRODREPO)
        {
            _PRODREPO = PRODREPO;
        }

        // public async Task<IActionResult> Get()
        // {

        //     UnitOfMeasure G = new UnitOfMeasure() { Id = 1, Name = "G", Description = "Abaixo de um Kg" };
        //     UnitOfMeasure Kg = new UnitOfMeasure() { Id = 2, Name = "Kg", Description = "Um Kg ou mais." };
        //     UnitOfMeasure L = new UnitOfMeasure() { Id = 3, Name = "L", Description = "Um litro ou mais." };
        //     UnitOfMeasure Ml = new UnitOfMeasure() { Id = 4, Name = "Ml", Description = "Abaixo de um litro." };

        //     List<SubCategory> drinksSubCats = new List<SubCategory>();
        //     drinksSubCats.Add(new SubCategory() { Id = 1, Name = "Refrigerantes" });
        //     drinksSubCats.Add(new SubCategory() { Id = 2, Name = "Sucos" });
        //     drinksSubCats.Add(new SubCategory() { Id = 3, Name = "Água Mineral" });


        //     List<SubCategory> EatsSubCats = new List<SubCategory>();
        //     EatsSubCats.Add(new SubCategory() { Id = 4, Name = "Massas" });
        //     EatsSubCats.Add(new SubCategory() { Id = 5, Name = "Frios" });
        //     EatsSubCats.Add(new SubCategory() { Id = 6, Name = "Carnes" });

        //     Category catEats = new Category() { Id = 1, Name = "Alimentação", SubCategories = EatsSubCats };
        //     Measure measureDrink = new Measure() { Id = 1, unitOfMeasure = Ml, Capacity = "550" };

        //     Category catDrinks = new Category() { Id = 2, Name = "Bebidas", SubCategories = drinksSubCats };
        //     Measure measureEat = new Measure() { Id = 2, unitOfMeasure = Kg, Capacity = "1" };


        //     Product product1 = new Product()
        //     {
        //         Id = 0,
        //         Name = "Pizza",
        //         Description = "",
        //         Quantity = 10,
        //         Cost = "R$ ,500",
        //         Price = "R$ 10,00",
        //         Measure = measureEat,
        //         Manufacturer = "Sádia",
        //         Category = catEats,
        //     };



        //     Product product0 = new Product()
        //     {
        //         Id = 0,
        //         Name = "Fanta",
        //         Description = "",
        //         Quantity = 50,
        //         Cost = "R$ 8,00",
        //         Price = "R$ 12,00",
        //         Measure = measureDrink,
        //         Manufacturer = "Coca-Cola",
        //         Category = catDrinks,
        //     };


        //     _PRODREPO.Add(product0);
        //     _PRODREPO.Add(product1);

        //     if (await _PRODREPO.Save())
        //     {
        //         return Ok("Deu TOP DE MAIS ZÉ.");
        //     }


        //     return Ok("Deu Ruim Mano.");


        // }

        // [HttpGet]
        // public IEnumerable<WeatherForecast> Get()
        // {

        // }
    }
}
