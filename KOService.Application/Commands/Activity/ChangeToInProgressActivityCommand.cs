using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Activity
{
    public class ChangeToInProgressActivityCommand : IRequest
    {
        public Guid ActivityId;
    }
}
