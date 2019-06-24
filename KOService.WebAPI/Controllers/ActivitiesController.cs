using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Queries.Activity;
using KOService.Application.Commands.Activity;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using KOService.WebAPI.Infrastructure;

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ActivitiesController : Controller
    {
        private IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("mechanic/{mechanicId}")]
        public IActionResult GetMechanicActivities(Guid mechanicId, [FromQuery] string status)
        {

            GetWorkerActivitiesQuery query = new GetWorkerActivitiesQuery();

            query.MechanicId = mechanicId;

            query.Status = status;
            return Ok(_mediator.Send(query).Result);
        }
        [HttpGet]
        public IActionResult GetWorkerWithActivities()
        {
            GetWorkersWithActivitiesQuery query = new GetWorkersWithActivitiesQuery();
            

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
        [Authorize(Constants.Roles.Manager)]
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
        [Authorize(Constants.Roles.Manager)]
        public IActionResult AssignWorker(Guid activityId,Guid mechanicId)
        {

            AssignMechanicCommand command = new AssignMechanicCommand();
            command.ActivityId = activityId;
            command.MechanicId = mechanicId;
            var exception = _mediator.Send(command).Exception;

            if (exception != null)
            {
                throw exception.InnerException;
            }

            return Ok(command);
        }


        [HttpPut("cancel/{activityId}")]
        [Authorize(Constants.Roles.Mechanic)]
        public IActionResult CancelActivity(Guid activityId, [FromQuery] string comment)
        {
            CancelActivityCommand command = new CancelActivityCommand();

            command.ActivityId = activityId;
            command.Comment = comment;
            var exception = _mediator.Send(command).Exception;

            if (exception != null)
            {
                return BadRequest(exception.InnerException);
            }

            return NoContent();
        }

        [HttpPut("finish/{activityId}")]
        [Authorize(Constants.Roles.Mechanic)]
        public IActionResult FinishActivity(Guid activityId, [FromQuery] string comment)
        {
            FinishActivityCommand command = new FinishActivityCommand();

            command.ActivityId = activityId;
            command.Comment = comment;
            var exception = _mediator.Send(command).Exception;

            if (exception != null)
            {
                return BadRequest(exception.InnerException);
            }

            return NoContent();
        }

        [HttpPut("changeToInProgress/{activityId}")]
        [Authorize(Constants.Roles.Mechanic)]
        public IActionResult ChangeToInProgressActivity(Guid activityId)
        {
            ChangeToInProgressActivityCommand command = new ChangeToInProgressActivityCommand();

            command.ActivityId = activityId;
            var exception = _mediator.Send(command).Exception;

            if (exception != null)
            {
                return BadRequest(exception.InnerException);
            }

            return NoContent();
        }
    }
}