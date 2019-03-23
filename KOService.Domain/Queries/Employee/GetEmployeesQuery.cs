﻿using KOService.Application.DTOs.Employee;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Employee
{
    public class GetEmployeesQuery : IRequest<IEnumerable<EmployeeDto>>
    {

    }
}

