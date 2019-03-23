using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Employee;
using KOService.Domain.Entities;
using KOService.Domain.Repositories.Abstract;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Handlers
{
    public class GetEmployeesHandler : RequestHandler<GetEmployeesQuery, IEnumerable<EmployeeDto>>
    {
        private IRepository<Employee> _employeeRepository;

        public GetEmployeesHandler(IRepository<Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        protected override IEnumerable<EmployeeDto> Handle(GetEmployeesQuery request)
        {
            return Mapper.Map<IEnumerable<EmployeeDto>>(_employeeRepository.GetAll());
        }
    }
}
