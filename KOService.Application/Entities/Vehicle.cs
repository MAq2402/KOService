using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Vehicle: Entity
    {
        public Client Client { get; set; }
        public Guid ClientId { get; set; }
        public string RegistrationNumbers { get; set; }
        public Repair Repair { get; set; }
        public Guid VehicleTypeId { get; set; }
        public VehicleType VehicleType { get; set; }
    }
}
