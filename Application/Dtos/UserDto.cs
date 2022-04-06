using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo 20 carácteres. ")]
        public string UserName { get; set; }

        // [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [EmailAddress(ErrorMessage = "Por favor, insira um {0}, válido.")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [DataType(DataType.Password)]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo 255 carácteres. ")]
        public string Password { get; set; }
        

        [Required(ErrorMessage = "{0}, precisa ser preenchido.")]
        [DataType(DataType.Password)]
        [Compare("Password")]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "{0} deve conter no mínimo 3 e o máximo 255 carácteres. ")]
        public string ConfirmPassword { get; set; }


        public bool Authenticated { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public string Message { get; set; }

    }
}