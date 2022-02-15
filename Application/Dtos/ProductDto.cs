namespace Application.Dtos
{
    public class ProductDto
    {
       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int Capacity { get; set; }
        public string Cost { get; set; }
        public string Price { get; set; }
        public int UnitOfMeasureId { get; set; }
        public UnitOfMeasureDto UnitOfMeasure { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; }
        public string Manufacturer {get; set;}

    }
}