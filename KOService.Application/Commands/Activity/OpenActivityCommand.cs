using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Activity
{
    public class OpenActivityCommand : IRequest
    {
        public Guid ActivityId;
    }
}
