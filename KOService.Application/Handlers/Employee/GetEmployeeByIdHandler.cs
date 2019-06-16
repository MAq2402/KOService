using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Employee;
using KOService.Domain.Entities;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace KOService.Application.Handlers.Employee
{
    public class GetEmployeeByIdHandler : RequestHandler<GetEmployeeByIdQuery, EmployeeWithAccountInfoDto>
    {
        private KOServiceDbContext _dbContext;

        public GetEmployeeByIdHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override EmployeeWithAccountInfoDto Handle(GetEmployeeByIdQuery request)
        {
            Guid guidToCompare = new Guid(request.Id.ToString().ToLower());

            var employee = _dbContext.Employees.Where(e => e.Id == guidToCompare)
                .Include(e => e.Identity)                
                .FirstOrDefault();

            if (employee == null)
            {
                throw new Exception("Could not find employee");
            }

            return Mapper.Map<EmployeeWithAccountInfoDto>(employee);
        }
    }
}
