using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Commands.Employee;
using KOService.Application.Queries.Employee;
using KOService.WebAPI.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/employees")]
    [ApiController]
    [EnableCors(Constants.Cors.AppPolicy)]
    public class EmployeesController : Controller
    {
        private IMediator _mediator;

        public EmployeesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_mediator.Send(new GetEmployeesQuery()).Result);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(string id)
        {
            var result = _mediator.Send(new GetEmployeeByIdQuery { Id = id}).Result;
            int a = 5;
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(string id,[FromBody] UpdateEmployeeCommand command)
        {
            command.Id = id;

            var result = _mediator.Send(command);

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }

        [HttpPut("{id}/terminate")]
        public IActionResult TerminateEmployee(string id)
        {
            var result = _mediator.Send(new TerminateEmployeeCommand() {Id = id});

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }
    }
}
