using System;
using System.Collections.Generic;

namespace KOService.Domain.Entities
{
    public class Part : Entity
    {

        public string Name { get; private set; }
        public string Manufacturer { get; private set; }
        public string ManufacturerId { get; private set; }
        public double Price { get; private set; }
        public Guid PricingId { get; private set; }
        public Pricing Pricing { get; private set; }

        public Part(Guid id, string name, string manufacturer, string manufacturerId, double price) : base(id)
        {
            Name = name;
            Manufacturer = manufacturer;
            ManufacturerId = manufacturerId;
            Price = price;
        }
        public Part()
        {

        }
    }
}

