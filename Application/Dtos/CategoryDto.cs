using System.Collections.Generic;

namespace Application.Dtos
{
    public class CategoryDto
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public List<SubCategoryDto> SubCategories {get; set;}
    }
}