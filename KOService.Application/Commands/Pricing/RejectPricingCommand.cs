using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Pricing
{
    public class RejectPricingCommand: IRequest
    {
        public Guid RepairId { get; set; }
    }
}
