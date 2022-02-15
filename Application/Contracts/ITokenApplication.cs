using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Dtos;
using Microsoft.AspNetCore.Identity;

namespace Application.Contracts
{
    public interface ITokenApplication
    {
        UserToken GenerateToken(UserDto usr);
        string GenerateToken(IEnumerable<Claim> claims);
        string GenerateRefreshToken();
        void SaveRefreshToken(string usrName, string refreshToken);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    
        void DeleteRefreshToken(string usrName, string refreshToken);


    }
}