using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Address
{
    public class AddressForCreationDto
    {
        public string Code { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
    }
}
