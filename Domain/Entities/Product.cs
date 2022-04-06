using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        // public int Capacity { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        //dimensions
        public string Height { get; set; }
        public string Width { get; set; }
        public string Depth { get; set; }
        public string Shape { get; set; }
        //state material
        public string State { get; set; }
        public string Storage { get; set; }
        public int Maxstacked { get; set; }
        public int UnitOfMeasureId { get; set; }
        public UnitOfMeasure UnitOfMeasure { get; set; }
        public int SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public string Manufacturer { get; set; }

        public string Description { get; set; }
        public string Comments { get; set; }
    }
}