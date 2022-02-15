using System.Collections.Generic;
namespace Domain.Entities.Authentication
{
    public class RefreshToken
    {
        public int Id { get; set; }        
        public string User { get; set; }
        public string Token { get; set; }

    }
}