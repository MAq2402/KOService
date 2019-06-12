

using KOService.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KOService.Domain.Entities
{
    public class Pricing : Entity
    {

        public Guid RepairId { get; set; }
        public Repair Repair { get; set; }
        private readonly List<Part> _parts = new List<Part>();
        public IEnumerable<Part> Parts => _parts.AsReadOnly();
        public double Labour { get; protected set; }

        public Pricing( Guid id, Guid repairId): base(id)
        {
            RepairId = repairId;
        }
        public Pricing()
        {

        }
        public void AddPart(string partName, string partManufacturer, string partManufacturerId, 
            double partPrice)
        {
            Part newPart = new Part(new Guid(),partName, partManufacturer, partManufacturerId, partPrice);
            _parts.Add(newPart);
        }
        public void AddParts(IEnumerable<Part> partsCollection)
        {
            _parts.AddRange(partsCollection);
        }
        public double GetAmountToPay()
        {
            double partsValue = 0;
            if (Parts != null)
            {
                partsValue = Parts.Sum(part => part.Price);
            }
            return partsValue + Labour;
        }


    }
}