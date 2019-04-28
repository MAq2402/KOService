using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;

namespace KOService.Domain.Entities
{
    public class VehicleType: Entity
    {
        private List<Vehicle> _vehicles = new List<Vehicle>();
        public VehicleType(Guid id, string brand, string model) : base(id)
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
        
        public string Brand { get; private set; }
        public string Model { get; private set; }
        public IEnumerable<Vehicle> Vehicles => _vehicles.AsReadOnly();
    }
}
