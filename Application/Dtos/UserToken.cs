using System;

namespace Application.Dtos
{
    public class UserToken
    {
        public bool Authenticated {get; set;}
        public DateTime Expiration {get; set;}
        public string Token {get; set;}
        public string RefreshToken {get; set;}
        public string UserName {get; set;}
        
    }
}