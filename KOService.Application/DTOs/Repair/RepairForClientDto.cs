using KOService.Application.DTOs.Activity;
using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Repair
{
    public class RepairForClientDto
    {
        public string VehicleRegistrationNumbers { get; set; }
        public string VehicleBrand { get; set; }
        public string VehicleModel { get; set; }
        public PricingDto Pricing { get; set; }
        public RepairStatus Status { get; set; }
        public IEnumerable<ActivityForClientDto> Activities {get; set;}
    }
}
