using System;
using System.Collections.Generic;
using Application.Contracts;
using Application.Dtos;
using UnitOfWork.Contracts;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;
using Application.Dtos.AuthenticationDto;
using Microsoft.AspNetCore.Identity;

namespace Application.Operations
{
    public class TokenApplication : ITokenApplication
    {

        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        private readonly IConfiguration _IConfiguration;

        public TokenApplication(IUnitOfWork WORKER, IMapper MAP, IConfiguration IConfiguration)
        {
            _WORKER = WORKER;
            _MAP = MAP;
            _IConfiguration = IConfiguration;
        }



        public UserToken GenerateToken(UserRegisterDto usr)
        {
            //the class thas is really used to generate the token
            byte[] Key = Encoding.UTF8.GetBytes(_IConfiguration["JWT:KEY"]);
            var TokenHandler = new JwtSecurityTokenHandler();

            var ExpDate = DateTime.Now.AddHours(Double.Parse(_IConfiguration["TOKEN:EXPIRESHOURS"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usr.UserName),
                    new Claim("COMPAIXÃO", "CIÊNCIA"),
                    new Claim(ClaimTypes.Role, usr.Id.ToString())
                }),
                Expires = ExpDate,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Key), SecurityAlgorithms.HmacSha256),
            };
            SecurityToken token = TokenHandler.CreateToken(tokenDescriptor);
            DateTime? F = tokenDescriptor.Expires;
            var usrTkn = new UserToken()
            {
                Authenticated = true,
                Expiration = tokenDescriptor.Expires ?? DateTime.Now,
                Token = TokenHandler.WriteToken(token),
                UserName = usr.UserName
            };

            return usrTkn;
        }

   
        public UserToken GenerateToken(UserLoginDto usr)
        {
            //the class thas is really used to generate the token
            byte[] Key = Encoding.UTF8.GetBytes(_IConfiguration["JWT:KEY"]);
            var TokenHandler = new JwtSecurityTokenHandler();

            var ExpDate = DateTime.Now.AddHours(Double.Parse(_IConfiguration["TOKEN:EXPIRESHOURS"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usr.UserName),
                    new Claim("COMPAIXÃO", "CIÊNCIA"),
                    new Claim(ClaimTypes.Role, usr.Id.ToString())
                }),
                Expires = ExpDate,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Key), SecurityAlgorithms.HmacSha256),
            };
            SecurityToken token = TokenHandler.CreateToken(tokenDescriptor);
            DateTime? F = tokenDescriptor.Expires;
            var usrTkn = new UserToken()
            {
                Authenticated = true,
                Expiration = tokenDescriptor.Expires ?? DateTime.Now,
                Token = TokenHandler.WriteToken(token),
                UserName = usr.UserName
            };

            return usrTkn;
        }

   
   
    }
}