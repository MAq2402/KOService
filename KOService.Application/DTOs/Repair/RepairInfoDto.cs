using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Repair
{
    public class RepairInfoDto
    {
       
        public string Description { get; set; }
        public string Result { get; set; }
        public DateTime StartDateTime { get; set; }
        public RepairStatus Status { get; set; }

        public string VehicleRegistrationNumbers { get; set; }
        public string VehicleBrand { get; set; }
        public string VehicleModel { get; set; }
        
        public string ClientName { get; set; }
        public string ClientPhoneNumber { get; set; }
        public string ClientEmail { get; set; }
      
    }
}
