using KOService.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Pricing
{
    public class CreatePricingCommand: IRequest
    {
        public Guid RepairId { get; set; }
        public double Labour { get; set; }
        public IEnumerable<PartForCreationDto> Parts { get; set; }
    }
}
