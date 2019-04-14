﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Authentication
{
    public class Identity : IdentityUser
    {
        public EmployeeRole EmployeeRole { get; set; }
    }
}
