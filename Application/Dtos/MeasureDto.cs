namespace Application.Dtos
{
    public class MeasureDto
    {
        public int Id { get; set; }
        public int unitOfMeasureId { get; set; }
        public UnitOfMeasureDto unitOfMeasure { get; set; }
        public string Capacity { get; set; }
        
    }
}