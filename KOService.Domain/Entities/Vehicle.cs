using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Vehicle : Entity
    {
        private List<Repair> _repairs = new List<Repair>();
        public Vehicle(Guid id, string registrationNumbers, Guid clientId, Guid typeId) : base(id)
        {
            TypeId = typeId;
            ClientId = clientId;

            SetRegistrationNumbers(registrationNumbers);
        }
        public Vehicle(Guid id, Guid clientId, string registrationNumbers, string brand, string model) : base(id)
        {
            Type = new VehicleType(Guid.NewGuid() ,brand, model);
            ClientId = clientId;

            SetRegistrationNumbers(registrationNumbers);
        }
        private Vehicle()
        {

        }
        public Client Client { get; private set; }
        public Guid ClientId { get; private set; }
        public string RegistrationNumbers { get; private set; }
        public IEnumerable<Repair> Repairs => _repairs.AsReadOnly();
        public Guid TypeId { get; private set; }
        public VehicleType Type { get; private set; }

        private void SetRegistrationNumbers(string registrationNumbers)
        {
            if (string.IsNullOrEmpty(registrationNumbers))
            {
                throw new DomainException("Registration numbers has not been provided");
            }

            RegistrationNumbers = registrationNumbers;
        }

        public void AddRepair(Repair repair)
        {
            if(repair == null)
            {
                throw new DomainException("Repair is null");
            }

            _repairs.Add(repair);
        }
    }
}
