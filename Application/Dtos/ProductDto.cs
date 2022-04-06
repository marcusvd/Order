using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        [
         Required(ErrorMessage = "{0}, precisa ser preenchido."),
         StringLength(150, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo de 150 carácteres.")
         ]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        public DateTime Date { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
         [Range(1, 100000)]
        public int Quantity { get; set; }
        [RegularExpression(@"^\$?\d+(\.(\d{2}))?$")]
        public decimal Price { get; set; }
        [RegularExpression(@"^\$?\d+(\.(\d{2}))?$")]
        public decimal Cost { get; set; }
        //dimensions
        [StringLength(25, MinimumLength = 3)]
        public string Height { get; set; }
        [StringLength(25, MinimumLength = 3)]
        public string Width { get; set; }
        [StringLength(25, MinimumLength = 3)]
        public string Depth { get; set; }
        [StringLength(25, MinimumLength = 3)]
        public string Shape { get; set; }
        //state material
        [StringLength(25, MinimumLength = 3)]
        public string State { get; set; }
        [StringLength(30, MinimumLength = 3)]
        public string Storage { get; set; }
        [Range(3, 100000)]
        public int Maxstacked { get; set; }

        public int UnitOfMeasureId { get; set; }
        public UnitOfMeasureDto UnitOfMeasure { get; set; }
        public int SubCategoryId { get; set; }
        public SubCategoryDto SubCategory { get; set; }

        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = ("{0} deve conter no mínimo 3 e o máximo de 1000 carácteres."))]
        public string Manufacturer { get; set; }

        [StringLength(1000, MinimumLength = 3, ErrorMessage = ("{0} deve conter no mínimo 3 e o máximo de 1000 carácteres."))]
        public string Description { get; set; }
        [StringLength(1000, MinimumLength = 3, ErrorMessage = ("{0} deve conter no mínimo 3 e o máximo de 1000 carácteres."))]
        public string Comments { get; set; }
    }
}