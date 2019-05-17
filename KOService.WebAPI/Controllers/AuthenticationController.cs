using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Application.DTOs.Auth;
using KOService.Application.Queries.Employee;
using KOService.Domain.Authentication;
using KOService.WebAPI.Authentication;
using KOService.WebAPI.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    [EnableCors(Constants.Cors.AppPolicy)]
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

            command.IdentityId = identity.Id;

            var commandResult =  _mediator.Send(command);

            if (commandResult.IsFaulted)
            {
                return BadRequest(commandResult.Exception.InnerException.Message);
            }

            return Ok("Account created");
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login([FromBody] LoginCredentials credentials)
        {
            var identity = await _userManager.FindByNameAsync(credentials.UserName);

            if (identity == null)
            {
                return NotFound();
            }

            if (!await _userManager.CheckPasswordAsync(identity, credentials.Password))
            {
                return BadRequest("Wrong credentials");
            } 

            var jwt = _jwtFactory.GenerateJwt(identity, credentials.UserName, identity.EmployeeRole, new JsonSerializerSettings { Formatting = Formatting.Indented });

            return Ok(jwt);
        }

        [HttpGet("user/{identityId}")]
        public IActionResult GetEmployeeByIdentityId(string identityId)
        {
            var result = _mediator.Send(new GetEmployeeByIdentityIdQuery { Id = identityId }).Result;
            return Ok(result);
        }

        [HttpPut("user/{userName}/changePassword")]
        public async Task<IActionResult> ChangePassword(string userName, [FromBody] PasswordsDto dto)
        {
            var identity = await _userManager.FindByNameAsync(userName);

            if(identity == null)
            {
                return NotFound();
            }

            var result = await _userManager.ChangePasswordAsync(identity, dto.CurrentPassword, dto.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(x => x.Description));
            }

            return Ok();
        }
    }
}
