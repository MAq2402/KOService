using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Employee;
using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Employee
{
    public class GetEmployeesHandler : RequestHandler<GetEmployeesQuery, IEnumerable<EmployeeDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetEmployeesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override IEnumerable<EmployeeDto> Handle(GetEmployeesQuery request)
        {
            var employees = _dbContext.Employees.Include(e => e.Identity)
                                      .Where(e => !e.IsTerminated);
            if (request.Role.HasValue)
            {
                return Mapper.Map<IEnumerable<EmployeeDto>>(employees.Where(e => e.Identity.EmployeeRole == request.Role));
            }
            else
            {
                return Mapper.Map<IEnumerable<EmployeeDto>>(employees);
            }
            
        }
    }
}
