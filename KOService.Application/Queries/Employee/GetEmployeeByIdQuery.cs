using KOService.Application.DTOs.Employee;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Employee
{
    public class GetEmployeeByIdQuery : IRequest<EmployeeWithAccountInfoDto>
    {
        public string Id { get; set; }
    }
}
