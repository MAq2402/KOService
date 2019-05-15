using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class CancelRepairCommand : IRequest
    {
        public string Id { get; set; }
        public string Result { get; set; }
    }
}
