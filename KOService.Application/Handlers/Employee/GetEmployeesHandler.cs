using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Employee;
using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
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
            return Mapper.Map<IEnumerable<EmployeeDto>>(_dbContext.Employees);
        }
    }
}
