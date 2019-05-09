using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Queries.Activity;
using KOService.Application.Commands.Activity;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : Controller
    {
        private IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("mechanic/{mechanicId}")]
        public IActionResult GetMechanicActivities(Guid mechanicId)
        {
            GetWorkerActivitiesQuery query = new GetWorkerActivitiesQuery();
            query.WorkerId = mechanicId;
            return Ok(_mediator.Send(query).Result);
        }

        [HttpGet("repair/{repairId}")]
        public IActionResult GetRepairActivities(Guid repairId)
        {
            GetRepairActivitiesQuery query = new GetRepairActivitiesQuery();
            query.RepairId = repairId;
            return Ok(_mediator.Send(query).Result);
        }
        
        [HttpPost]
        public IActionResult CreateActivity([FromBody] CreateActivityCommand command)
        {
            var exception = _mediator.Send(command).Exception;

            if (exception != null)
            {
                throw exception.InnerException;
            }

            return Ok(command);
        }
        [HttpPut("{activityId}/{mechanicId}")]
        public IActionResult AssignWorker([FromBody] CreateActivityCommand command)
        {
            var exception = _mediator.Send(command).Exception;

            if (exception != null)
            {
                throw exception.InnerException;
            }

            return Ok(command);
        }


    }
}