using KOService.Application.DTOs.Employee;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Employee
{
    public class GetEmployeeQuery : IRequest<EmployeeDto>
    {
        public string Id { get; set; }
    }
}
