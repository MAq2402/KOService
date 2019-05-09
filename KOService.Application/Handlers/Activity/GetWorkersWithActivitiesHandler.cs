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
    class GetWorkersWithActivitiesHandler : RequestHandler<GetWorkersWithActivitiesQuery, IEnumerable<WorkersWithActivitiesDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetWorkersWithActivitiesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<WorkersWithActivitiesDto> Handle(GetWorkersWithActivitiesQuery request)
        {
            /*
            var legalLinks = from category in db.Categories
                 join link in db.Links on category.Id equals link.CategoryId into categoryLinks
                 orderby category.Title
                 select new LegalLinks_categoriesDTO()
                 {
                     CategoryId = category.Id,
                     Category = category.Title,
                     Links = categoryLinks.Select(l => new LegalLinks_linksDTO { Title = l.Title, LinkURL = l.LinkURL })
                 };
                 */

            var workersWithActivities = from employee in _dbContext.Employees
                                        join activity in _dbContext.Activities on employee.Id equals activity.MechanicId into employeeActivities
                                        orderby employee.Id
                                        select new WorkersWithActivitiesDto()
                                        {
                                            worker = new EmployeeDto()
                                            {
                                                FirstName = employee.FirstName,
                                                LastName = employee.LastName,
                                                Id = employee.Id,
                                                IdentityEmployeeRole = employee.Identity.EmployeeRole
                                            },
                                            activities = employeeActivities.Select(a => new ActivityDto { Description = a.Description })
                                        };
            return Mapper.Map<IEnumerable<WorkersWithActivitiesDto>>(workersWithActivities);
        }


    }
}
