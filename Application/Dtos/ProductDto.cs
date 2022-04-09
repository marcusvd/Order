using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo de 150 carácteres.")]
        public string Name { get; set; }
        [StringLength(150, ErrorMessage = ("{0} deve conter o máximo de 1000 carácteres."))]
        public string Manufacturer { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [Range(1, 100000)]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        public DateTime Date { get; set; }

        public int SubCategoryId { get; set; }
        // public SubCategoryDto SubCategory { get; set; }
        // [RegularExpression(@"^\d+\.\d{0,2}$")]
        [Range(0, 9999999999999999.99)]
        public decimal Price { get; set; }
        // [RegularExpression(@"^\d+\.\d{0,2}$")]
        [Range(0, 9999999999999999.99)]
        public decimal Cost { get; set; }
        //dimensions
        [StringLength(25, ErrorMessage = ("{0} deve conter o máximo de 25 carácteres."))]
        public string Height { get; set; }
        [StringLength(25, ErrorMessage = ("{0} deve conter o máximo de 25 carácteres."))]
        public string Width { get; set; }
        [StringLength(25, ErrorMessage = ("{0} deve conter o máximo de 25 carácteres."))]
        public string Depth { get; set; }
        //state material
        [StringLength(25, ErrorMessage = ("{0} deve conter o máximo de 25 carácteres."))]
        public string State { get; set; }
        [StringLength(30)]
        public string Storage { get; set; }

         [StringLength(25, ErrorMessage = ("{0} deve conter o máximo de 25 carácteres."))]
        public string Format { get; set; }

        [Range(0, 100000, ErrorMessage = ("{0} Máximo aceito é 100000."))]
        public int Maxstacked { get; set; }
        [Range(0, 100000, ErrorMessage = ("{0} Máximo aceito é 100000."))]
        public int Weight { get; set; }

        public int UnitOfMeasureId { get; set; }
        // public UnitOfMeasureDto UnitOfMeasure { get; set; }
        [StringLength(1000, ErrorMessage = ("{0} deve o máximo de 1000 carácteres."))]
        public string Description { get; set; }
        [StringLength(1000, ErrorMessage = ("{0} deve conter o máximo de 1000 carácteres."))]
        public string Comments { get; set; }
    }
}