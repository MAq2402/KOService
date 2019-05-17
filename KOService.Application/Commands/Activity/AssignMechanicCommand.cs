using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Activity
{
    public class AssignMechanicCommand : IRequest
    {
        public Guid MechanicId {get; set;}
        public Guid ActivityId { get; set;}

    }
}
