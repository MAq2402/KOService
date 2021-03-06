﻿using AutoMapper;
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
    public class GetEmployeeByIdentityIdHandler : RequestHandler<GetEmployeeByIdentityIdQuery, EmployeeDto>
    {
        private KOServiceDbContext _dbContext;

        public GetEmployeeByIdentityIdHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override EmployeeDto Handle(GetEmployeeByIdentityIdQuery request)
        {
            var employeeToReturn = _dbContext.Employees.Include(e => e.Identity)
                                        .FirstOrDefault(e => e.IdentityId == request.Id);
            return Mapper.Map<EmployeeDto>(employeeToReturn);
        }
    }
}
