﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KOService.Application.Commands.Repair;
using KOService.WebAPI.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KOService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepairsController : Controller
    {
        private IMediator _mediator;

        public RepairsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize(Constants.Roles.Manager)]
        public IActionResult CreateRepair([FromBody] CreateRepairCommand command)
        {
            _mediator.Send(command);

            return Ok(command);
        }
        
    }
}
