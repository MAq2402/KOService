using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Activity
{
    public class CancelActivityCommand : IRequest
    {
        public Guid ActivityId;
        public string Comment;
    }
}
