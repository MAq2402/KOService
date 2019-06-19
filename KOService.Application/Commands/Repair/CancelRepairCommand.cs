using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class CancelRepairCommand : IRequest
    {
        public string Result { get; set; }
        public string Id { get; set; }
    }
}
