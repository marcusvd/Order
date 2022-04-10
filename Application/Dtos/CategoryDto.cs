using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo de 100 carácteres.")]
        public string Name { get; set; }
        public List<SubCategoryDto> SubCategories { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}