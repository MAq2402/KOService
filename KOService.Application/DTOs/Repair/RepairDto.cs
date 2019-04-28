using KOService.Application.DTOs.Activity;
using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Repair
{
    public class RepairDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid VehicleId { get; set; }
        public string VehicleRegistrationNumbers { get; set; }
        public string VehicleBrand { get; set; }
        public string VehicleModel { get; set; }
        public Guid ManagerId { get; set; }
        public RepairStatus Status { get; set; }
        public string Result { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public IEnumerable<ActivityDto> Activities { get; set; }
    }
}
