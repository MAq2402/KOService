using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class VehicleType: Entity
    {
        public VehicleType(string brand, string model)
        {
            if(string.IsNullOrEmpty(brand))
            {
                throw new DomainException("Brand has not been provided");
            }

            if (string.IsNullOrEmpty(model))
            {
                throw new DomainException("Brand has not been provided");
            }

            Brand = brand;
            Model = model;
        }
        private VehicleType()
        {

        }
        private ICollection<Vehicle> vehicles = new List<Vehicle>();
        public string Brand { get; private set; }
        public string Model { get; private set; }
        public IEnumerable<Vehicle> Vehicles => vehicles.ToList();
    }
}
