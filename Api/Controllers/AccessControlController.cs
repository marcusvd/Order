using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Application.Contracts;
using Microsoft.IdentityModel.Tokens;

namespace OStorage.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccessControlController : ControllerBase
    {
        private readonly IAccountApplication _IAccountApplication;
        private readonly ITokenApplication _ITokenApplication;

        public AccessControlController
        (ITokenApplication ITokenApplication,
          IAccountApplication IAccountApplication

        )
        {
            _ITokenApplication = ITokenApplication;
            _IAccountApplication = IAccountApplication;
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return "AutorizaController :: Acessado em : " + DateTime.Now.ToLongDateString();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDto userDto)
        {
            if (userDto == null) return NoContent();

            UserToken usrTkn = await _IAccountApplication.RegisterUsr(userDto);
            if (usrTkn.Authenticated)
            {
                return Ok(usrTkn);
            }
            return BadRequest();

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            if (userDto == null) return NoContent();

            var result = await _IAccountApplication.Login(userDto);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();

        }



        [HttpPost("refresh")]
        public IActionResult Refresh(string token, string refreshToken)
        {
            var principal = _ITokenApplication.GetPrincipalFromExpiredToken(token);
            var userName = principal.Identity.Name;
            var savedRefreshToken = _ITokenApplication.GenerateRefreshToken();
            if (savedRefreshToken != refreshToken){
                
                throw new SecurityTokenException("Invalid refresh token");
            }

            var newJwtToken = _ITokenApplication.GenerateToken(principal.Claims);
            var newRefreshToken = _ITokenApplication.GenerateRefreshToken();
            _ITokenApplication.DeleteRefreshToken(userName, refreshToken);
            _ITokenApplication.SaveRefreshToken(userName, newRefreshToken);

            var TokenAndRefrseh = new UserToken
            {
                Token = newJwtToken,
                RefreshToken = newRefreshToken
            };

            return Ok(TokenAndRefrseh);
        }

    }
}