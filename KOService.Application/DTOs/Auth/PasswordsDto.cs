using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Auth
{
    public class PasswordsDto : IRequest
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
