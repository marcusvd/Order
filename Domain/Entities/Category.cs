using System.Collections.Generic;
namespace Domain.Entities
{
    public class Category
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public List<SubCategory> SubCategories {get; set;}

    }
}