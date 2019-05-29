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
        public IActionResult GetMechanicActivities(Guid mechanicId, [FromQuery] string status)
        {

            GetWorkerActivitiesQuery query = new GetWorkerActivitiesQuery();
            query.WorkerId = mechanicId;
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
        public IActionResult CancelActivity(Guid activityId, [FromBody] string comment)
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
        public IActionResult FinishActivity(Guid activityId, [FromBody] string comment)
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

        [HttpPut("open/{activityId}")]
        public IActionResult OpenActivity(Guid activityId)
        {
            OpenActivityCommand command = new OpenActivityCommand();

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