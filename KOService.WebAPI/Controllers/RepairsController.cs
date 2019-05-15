using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Commands.Repair;
using KOService.Application.Queries.Repair;
using KOService.WebAPI.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RepairsController : Controller
    {
        private IMediator _mediator;

        public RepairsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet()]
        public IActionResult GetRepairs([FromQuery] GetRepairsQuery query)
        {
            query = query ?? new GetRepairsQuery();
            return Ok(_mediator.Send(query).Result);
        }

        [HttpGet("{id}")]
        public IActionResult GetRepair([FromQuery] GetRepairsQuery query)
        {
            query = query ?? new GetRepairsQuery();
            return Ok(_mediator.Send(query).Result);
        }

        [HttpPost]
        [Authorize(Constants.Roles.Manager)]
        public IActionResult CreateRepair([FromBody] CreateRepairCommand command)
        {
            var result = _mediator.Send(command);

            if(result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return Ok(command);
        }

        [HttpPut("{id}/changeToInProgress")]
        public IActionResult ChangeRepiarStatusToInProgress(string id)
        {
            var result = _mediator.Send(new ChangeToInProgressCommand() {Id = id});

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }

        [HttpPut("{id}/cancel")]
        public IActionResult CancelRepair(string id,[FromBody] CancelRepairCommand command)
        {
            command.Id = id;
            var result = _mediator.Send(command);

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }

        [HttpPut("{id}/finish")]
        public IActionResult FinishRepair(string id, [FromBody] FinishRepairCommand command)
        {
            command.Id = id;
            var result = _mediator.Send(command);

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }
    }
}
