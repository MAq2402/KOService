using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Vehicle : Entity
    {
        public Client Client { get; set; }
        public Guid ClientId { get; set; }
        public string RegistrationNumbers { get; set; }
        public ICollection<Repair> Repairs { get; private set; } = new List<Repair>();
        public Guid TypeId { get; set; }
        public VehicleType Type { get; set; }
    }
}
