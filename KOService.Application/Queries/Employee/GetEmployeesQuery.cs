using KOService.Application.DTOs.Employee;
using KOService.Domain.Authentication;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Employee
{
    public class GetEmployeesQuery : IRequest<IEnumerable<EmployeeDto>>
    {
        public EmployeeRole? Role { get; set; }
    }
}

