using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Commands.Pricing;
using KOService.Application.Queries.Repair;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : Controller
    {
        private IMediator _mediator;

        public ClientController(IMediator mediator)
        {
            _mediator = mediator;
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