using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Employee;
using KOService.Domain.Entities;
using KOService.Domain.Repositories.Abstract;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Employee
{
    public class GetEmployeeByIdentityIdHandler : RequestHandler<GetEmployeeByIdentityIdQuery, EmployeeDto>
    {
        private IEmployeeRepository _employeeRepository;

        public GetEmployeeByIdentityIdHandler(IEmployeeRepository employeeRepository,
            KOServiceDbContext dbContext)
        {
            _employeeRepository = employeeRepository;
        }
        protected override EmployeeDto Handle(GetEmployeeByIdentityIdQuery request)
        {
            var employeeToReturn = _employeeRepository.GetEmployeeByIdentityName(request.Name);
            return Mapper.Map<EmployeeDto>(employeeToReturn);
        }
    }
}
