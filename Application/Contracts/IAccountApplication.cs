using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Application.Contracts
{
    public interface IAccountApplication
    {
        Task<UserToken> RegisterUsr([FromBody] UserDto userDto);
        Task<UserToken> Login([FromBody] UserDto userDto);
    }
}