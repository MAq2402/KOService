using KOService.Application.DTOs.Activity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Activity
{
    public class CreateActivityCommand:IRequest
    {
        public string Description { get; set; }
        public int SequenceNumber { get; set; }
        public Guid RepairId { get; set; }
    }
}
