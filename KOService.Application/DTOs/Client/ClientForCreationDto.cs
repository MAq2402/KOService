using KOService.Application.DTOs.Address;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Client
{
    public class ClientForCreationDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public AddressForCreationDto Address { get; set; }
    }
}
