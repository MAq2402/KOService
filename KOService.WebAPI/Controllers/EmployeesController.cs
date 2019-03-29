using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Queries.Employee;
using KOService.Domain.Authentication;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : Controller
    {
        private IMediator _mediator;
        private UserManager<Identity> _userManager;

        public EmployeesController(IMediator mediator, UserManager<Identity> userManager)
        {
            _mediator = mediator;
            _userManager = userManager;
        }
        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_mediator.Send(new GetEmployeesQuery()).Result);
        }
        [HttpGet("/currentIdentity")]
        public IActionResult GetCurrentEmployeeIdentity(string identityId)
        {
            //var identity = await _userManager.FindByIdAsync(identityId);
            var result = _mediator.Send(new GetEmployeeByIdentityIdQuery { Id = identityId }).Result;
            return Ok(result);
        }
    }
}
