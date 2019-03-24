using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Domain.Authentication;
using KOService.WebAPI.Authentication;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private IMediator _mediator;
        private UserManager<Identity> _userManager;
        private IJwtFactory _jwtFactory;

        public AuthenticationController(IMediator mediator, 
            UserManager<Identity> userManager, 
            IJwtFactory jwtFactory)
        {
            _mediator = mediator;
            _userManager = userManager;
            _jwtFactory = jwtFactory;
        }

       [HttpPost("register")]
       public async Task<IActionResult> Register([FromBody] RegisterCommand command)
        {
            var identity = Mapper.Map<Identity>(command);

            var result = await _userManager.CreateAsync(identity, command.Password);

            if (!result.Succeeded)
            {
                return BadRequest("Account creation has failed");
            }

            await _mediator.Send(command);

            return Ok("Account created");
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login([FromBody] LoginCredentials credentials)
        {
            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return NotFound();
            }

            var jwt = _jwtFactory.GenerateJwt(identity, credentials.UserName, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return Ok(jwt);
        }
        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
