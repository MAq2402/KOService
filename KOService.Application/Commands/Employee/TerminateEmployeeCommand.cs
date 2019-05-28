using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Employee
{
    public class TerminateEmployeeCommand : IRequest
    {
        public string Id { get; set; }
    }
}
