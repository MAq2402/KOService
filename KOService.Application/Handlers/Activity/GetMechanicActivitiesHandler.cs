using AutoMapper;
using KOService.Application.DTOs.Activity;
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
    class GetMechanicActivitiesHandler : RequestHandler<GetMechanicActivitiesQuery, IEnumerable<ActivityDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetMechanicActivitiesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<ActivityDto> Handle(GetMechanicActivitiesQuery request)
        {
             var activities = _dbContext.Activities.Where(a => a.MechanicId == request.MechanicId);
             return Mapper.Map<IEnumerable<ActivityDto>>(activities);
        }


    }
}
