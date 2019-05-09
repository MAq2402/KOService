using KOService.Application.DTOs.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Activity
{
    public class WorkersWithActivitiesDto
    {
        public EmployeeDto worker;
        public IEnumerable<ActivityDto> activities;
    }
}
