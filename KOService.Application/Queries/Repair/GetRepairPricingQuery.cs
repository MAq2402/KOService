using KOService.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Repair
{
    public class GetRepairPricingQuery: IRequest<PricingDto>
    {
        public Guid RepairId { get; set; }
    }
}
