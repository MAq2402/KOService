using AutoMapper;
using KOService.Application.DTOs.Activity;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace KOService.Application.Handlers.Activity
{
    class GetWorkerActivitiesHandler : RequestHandler<GetWorkerActivitiesQuery, IEnumerable<ActivityDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetWorkerActivitiesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<ActivityDto> Handle(GetWorkerActivitiesQuery request)
        {
             var activities = _dbContext.Activities.Where(a => a.MechanicId == request.WorkerId);
             return Mapper.Map<IEnumerable<ActivityDto>>(activities);
        }


    }
}
