using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KOService.WebAPI.Infrastructure
{
    public static class Constants
    {
        public static class Cors
        {
            public const string AppPolicy = "KOServiceCorsPolicy";
        }

        public static class Roles
        {
            public const string Manager = "manager";
            public const string Mechanic = "mechanic";
            public const string Admin = "admin";
        }

        public static class ClaimTypes
        {
            public const string EmployeeRole = "employee_role";
        }
    }
}
