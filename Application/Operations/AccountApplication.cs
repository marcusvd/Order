using Microsoft.AspNetCore.Identity;
using UnitOfWork.Contracts;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using Application.Contracts;

namespace Application.Operations
{
    public class AccountApplication : IAccountApplication
    {
        private readonly IUnitOfWork _WORKER;
        private readonly IMapper _MAP;
        private readonly IConfiguration _IConfiguration;

        private readonly UserManager<IdentityUser> _usrMgr;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ITokenApplication _ITokenApplication;

        public AccountApplication(
            // IUnitOfWork WORKER,
            // IMapper MAP,
            // IConfiguration IConfiguration,
            UserManager<IdentityUser> usrMgr,
            SignInManager<IdentityUser> signInManager,
             ITokenApplication ITokenApplication
            )
        {
            _usrMgr = usrMgr;
            _signInManager = signInManager;
            _ITokenApplication = ITokenApplication;

            // _WORKER = WORKER;
            // _MAP = MAP;
            // _IConfiguration = IConfiguration;
        }


        public async Task<UserToken> RegisterUsr([FromBody] UserDto userDto)
        {
            var usrToRecord = new IdentityUser
            {
                UserName = userDto.Email,
                Email = userDto.Email,
                EmailConfirmed = true
            };

            IdentityResult resultOfCreation = await _usrMgr.CreateAsync(usrToRecord, userDto.Password);

            if (!resultOfCreation.Succeeded)
            {
                throw new Exception("Error during registration of user, sorry please call the support team.");
            }

            await _signInManager.SignInAsync(usrToRecord, false);

            return _ITokenApplication.GenerateToken(userDto);
        }

        public async Task<UserToken> Login([FromBody] UserDto userDto)
        {
            var login = await _signInManager.PasswordSignInAsync(
                userDto.Email,
                userDto.Password,
                isPersistent: false,
                lockoutOnFailure: false
                );


            if (login.IsNotAllowed)
            {
                throw new Exception("Password or UserName invalid ");
            }

            var token = _ITokenApplication.GenerateToken(userDto);
            token.RefreshToken = _ITokenApplication.GenerateRefreshToken();
            _ITokenApplication.SaveRefreshToken(userDto.Email, token.RefreshToken);

            return token;

        }







    }
}