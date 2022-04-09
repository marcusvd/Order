using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos
{
    public class UserRegisterDto
    {
       
        public int Id { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo 20 carácteres. ")]
        public string UserName { get; set; }
        
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [DataType(DataType.Password)]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo 255 carácteres. ")]
        public string Password { get; set; }
        

        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [DataType(DataType.Password)]
        [Compare("Password")]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo 255 carácteres. ")]
        public string ConfirmPassword { get; set; }

    }
}

