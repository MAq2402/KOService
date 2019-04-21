using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Vehicle : Entity
    {
        private ICollection<Repair> repairs = new List<Repair>();
        public Vehicle(Guid id, string registrationNumbers, Guid typeId) : base(id)
        {
            if (string.IsNullOrEmpty(registrationNumbers))
            {
                throw new DomainException("Registration numbers has not been provided");
            }

            RegistrationNumbers = registrationNumbers;
            TypeId = typeId;
        }
        public Vehicle(Guid id, string registrationNumbers, string brand, string model) : base(id)
        {
            Type = new VehicleType(brand, model);
            RegistrationNumbers = registrationNumbers;
        }
        private Vehicle()
        {

        }
        public Client Client { get; private set; }
        public Guid ClientId { get; private set; }
        public string RegistrationNumbers { get; private set; }
        public IEnumerable<Repair> Repairs => repairs.ToList();
        public Guid TypeId { get; private set; }
        public VehicleType Type { get; private set; }
    }
}
