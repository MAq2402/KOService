using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Employee;
using KOService.Domain.Entities;
using KOService.Domain.Repositories.Abstract;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Employee
{
    public class GetEmployeeByIdentityIdHandler : RequestHandler<GetEmployeeByIdentityIdQuery, EmployeeDto>
    {
        private IRepository<Domain.Entities.Employee> _employeeRepository;

        public GetEmployeeByIdentityIdHandler(IRepository<Domain.Entities.Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        protected override EmployeeDto Handle(GetEmployeeByIdentityIdQuery request)
        {
            IList<Domain.Entities.Employee> employees = _employeeRepository.GetAll().ToList<Domain.Entities.Employee>();
            var tmp = employees[0];
            var tmp2 = tmp.IdentityId;
            return Mapper.Map<EmployeeDto>(employees[0]);
        }
    }
}
