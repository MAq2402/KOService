﻿using KOService.Domain.Authentication;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Authentication
{
    public class RegisterCommand : IRequest
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public EmployeeRole EmployeeRole { get; set; }
        public string IdentityId { get; set; }
    }
}
