using AutoMapper;
using KOService.Application.DTOs.Activity;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace KOService.Application.Handlers.Activity
{
    class GetWorkersWithActivitiesHandler : RequestHandler<GetWorkersWithActivitiesQuery, IEnumerable<WorkersWithActivitiesDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetWorkersWithActivitiesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<WorkersWithActivitiesDto> Handle(GetWorkersWithActivitiesQuery request)
        {
            var workers = _dbContext.Employees.Include(e => e.Activities)
                 
                     .Where(e => e.Identity.EmployeeRole == Domain.Authentication.EmployeeRole.Mechanic);
            return Mapper.Map<IEnumerable<WorkersWithActivitiesDto>>(workers);

           
        }


    }
}
