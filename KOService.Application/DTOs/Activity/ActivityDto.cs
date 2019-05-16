using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Activity
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid MechanicId { get; set; }
        public string MechanicName { get; set; }
        public Guid RepairId { get; set; }
        public ActivityStatus Status { get; set; }
        public string Result { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string VehicleRegistrationNumbers { get; set; }
        public string VehicleBrand { get; set; }
        public int SequenceNumber { get; set; }
    }
}
