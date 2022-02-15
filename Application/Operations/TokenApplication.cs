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

        public UserToken GenerateToken(UserDto usr)
        {
            //the class thas is really used to generate the token
            byte[] Key = Encoding.UTF8.GetBytes(_IConfiguration["JWT:KEY"]);
            var TokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usr.Email),
                    new Claim("COMPAIXÃO", "CIÊNCIA"),
                    new Claim(ClaimTypes.Role, usr.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Key), SecurityAlgorithms.HmacSha256),
            };
            SecurityToken token = TokenHandler.CreateToken(tokenDescriptor);

            double Hours = Double.Parse(_IConfiguration["TOKEN:EXPIRESHOURS"]);
            var usrTkn = new UserToken()
            {
                Authenticated = true,
                Expiration = DateTime.UtcNow.AddHours(Hours),
                Token = TokenHandler.WriteToken(token),
                UserName = usr.Email
            };

            return usrTkn;
        }
        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var TokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_IConfiguration["JWK:KEY"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(double.Parse(_IConfiguration["TOKEN:EXPIRESHOURS"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key)
                , SecurityAlgorithms.HmacSha256)
            };
            var token = TokenHandler.CreateToken(tokenDescriptor);
            return TokenHandler.WriteToken(token);



        }

        public string GenerateRefreshToken()
        {
            byte[] rdnBytes = new byte[32];
            var rndCreate = RandomNumberGenerator.Create();
            rndCreate.GetBytes(rdnBytes);
            return Convert.ToBase64String(rdnBytes);
        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_IConfiguration["JWT:KEY"])),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256
            , StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid Token");
            return principal;
        }
        private List<RefreshTokenDto> _refreshTokens = new List<RefreshTokenDto>();
        public void SaveRefreshToken(string usrName, string refreshToken)
        {
            _refreshTokens.Add(new RefreshTokenDto() { User = usrName, Token = refreshToken });
        }
        public void DeleteRefreshToken(string usrName, string refreshToken)
        {
            _refreshTokens.Add(new RefreshTokenDto() { User = usrName, Token = refreshToken });
        }
    }
}