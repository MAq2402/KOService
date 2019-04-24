using KOService.Domain.Exceptions;
using KOService.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace KOService.Domain.Entities
{
    public class Client : Entity
    {
        private readonly List<Vehicle> _vehicles = new List<Vehicle>();
        public Client(Guid id, string firstName, string lastName, string phoneNumber, string email, string street, string city, string code) : base(id)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                throw new DomainException("First name has not been provided");
            }

            if (string.IsNullOrEmpty(lastName))
            {
                throw new DomainException("Last name has not been provided");
            }

            FirstName = firstName;
            LastName = lastName;
            Address = new Address(street, city, code);
            ContactDetails = new ContactDetails(phoneNumber, email);
        }
        private Client()
        {

        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public ContactDetails ContactDetails { get; set; }
        public Address Address { get; private set; }
        public IEnumerable<Vehicle> Vehicles => _vehicles.AsReadOnly();

        public void AddRepair(Repair repair, Vehicle vehicle)
        {
            if (vehicle == null)
            {
                throw new DomainException("Vehicle is null");
            }

            vehicle.AddRepair(repair);

            if (!_vehicles.Any(v => v == vehicle))
            {
                _vehicles.Add(vehicle);
            }
        }

        public void UpdateContactDetails(string phoneNumber, string email)
        {
            ContactDetails = new ContactDetails(phoneNumber, email);
        }

        public void UpdateAddress(string street, string city, string code)
        {
            Address = new Address(street, city, code);
        }
    }
}
