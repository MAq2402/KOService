using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using KOService.Application.DTOs.Activity;

namespace KOService.Application.Queries.Activity
{
    public class GetMechanicActivitiesQuery: IRequest<IEnumerable<ActivityDto>>
    {
        public Guid MechanicId { get; set; }
        public string Status { get; set; }
    }
}
