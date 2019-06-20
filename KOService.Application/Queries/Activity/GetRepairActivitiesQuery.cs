using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using KOService.Application.DTOs.Activity;

namespace KOService.Application.Queries.Activity
{
    public class GetRepairActivitiesQuery : IRequest<IEnumerable<ActivityDto>>
    {
        public Guid RepairId { get; set; }
    }
}

