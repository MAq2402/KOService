using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Commands.Pricing;
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
    public class ClientsController : Controller
    {
        private IMediator _mediator;

        public ClientsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetClients()
        {
            return Ok(_mediator.Send(new GetClientsQuery()).Result);
        }

        [HttpPut("pricing/{repairNumber}/reject")]
        public IActionResult RejectPricing(string repairNumber)
        {
            var command = new RejectPricingCommand();
            command.RepairNumber = repairNumber;
            var result = _mediator.Send(command);

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }

        [HttpPut("pricing/{repairNumber}/accept")]
        public IActionResult AcceptPricing(string repairNumber)
        {
            var command = new AcceptPricingCommand();
            command.RepairNumber = repairNumber;
            var result = _mediator.Send(command);

            if (result.IsFaulted)
            {
                return BadRequest(result.Exception.InnerException.Message);
            }

            return NoContent();
        }

        [HttpGet("repair/{repairNumber}")]
        public IActionResult GetRepairForClient(string repairNumber)
        {
            var query = new GetRepairForClientQuery();
            query.RepairNumber = repairNumber;
            return Ok(_mediator.Send(query).Result);
        }
    }
}
