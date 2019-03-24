using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Domain.Authentication;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private IMediator _mediator;
        private UserManager<Identity> _userManager;

        public AuthenticationController(IMediator mediator, UserManager<Identity> userManager)
        {
            _mediator = mediator;
            _userManager = userManager;
        }
       [HttpPost]
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
    }
}
