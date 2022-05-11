using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public decimal Price { get; set; }
        public decimal LastPrice { get; set; }
        public decimal Cost { get; set; }
        public int MeasureId { get; set; }
        public Measure Measure { get; set; }
        public int Weight { get; set; }
        public string Description { get; set; }
        public string BarCode { get; set; }
    }
}