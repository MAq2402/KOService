using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using KOService.Application.DTOs.Activity;

namespace KOService.Application.Queries.Activity
{
    public class GetWorkerActivitiesQuery: IRequest<IEnumerable<ActivityDto>>
    {
        public Guid WorkerId { get; set; }
        public string Status { get; set; }
    }
}
