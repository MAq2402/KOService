using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class VehicleType: Entity
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public List<Vehicle> Vehicles { get; set; }
    }
}
