using KOService.Application.DTOs.Activity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Activity
{
    public class GetWorkersWithActivitiesQuery : IRequest<IEnumerable<WorkersWithActivitiesDto>>
    {
    }
}
