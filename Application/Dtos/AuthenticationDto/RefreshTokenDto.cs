using System.Collections.Generic;

namespace Application.Dtos.AuthenticationDto
{
    public class RefreshTokenDto
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string Token { get; set; }
    }
}