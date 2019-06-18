using KOService.Domain.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Employee
{
    public class EmployeeWithAccountInfoDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public EmployeeRole Role { get; set; }
        public string UserName { get; set; }
    }
}
