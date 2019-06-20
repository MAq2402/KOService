using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class ChangeToInProgressCommand : IRequest
    {
        public string Id { get; set; }
    }
}
