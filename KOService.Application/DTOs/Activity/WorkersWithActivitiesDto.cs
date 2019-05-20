using KOService.Application.DTOs.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Activity
{
    public class WorkersWithActivitiesDto
    {
        public Guid Id;
        public string FirstName;
        public string LastName;
       
        public IEnumerable<ActivityDto> Activities;
    }
}
