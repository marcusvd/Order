using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class UnitOfMeasure
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo de 150 carácteres.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo de 500 carácteres.")]
        public string Description { get; set; }

    }
}