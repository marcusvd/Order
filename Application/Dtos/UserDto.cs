using System;


namespace Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool Authenticated { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public string Message {get; set;}

    }
}