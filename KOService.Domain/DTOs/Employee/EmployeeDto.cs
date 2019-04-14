using KOService.Domain.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Employee
{
    public class EmployeeDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public EmployeeRole IdentityRole { get; set; }
    }
}
