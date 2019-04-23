using KOService.Domain.Exceptions;
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
        public Client(Guid id, string firstName, string lastName, string contactNumber, string email, Address address) : base(id)
        {
            if(address == null)
            {
                throw new DomainException("Address has not been provided");
            }

            if (string.IsNullOrEmpty(firstName))
            {
                throw new DomainException("First name has not been provided");
            }

            if (string.IsNullOrEmpty(lastName))
            {
                throw new DomainException("Last name has not been provided");
            }

            if (string.IsNullOrEmpty(contactNumber))
            {
                throw new DomainException("Contact number has not been provided");
            }

            if (IsPhoneNumber(contactNumber))
            {
                throw new DomainException("Contact number has wrong format");
            }

            if (string.IsNullOrEmpty(email))
            {
                throw new DomainException("Email has not been provided");
            }

            if (IsValidEmail(email))
            {
                throw new DomainException("Email is incorrect");
            }

            FirstName = firstName;
            LastName = lastName;
            ContactNumber = contactNumber;
            Email = email;
            Address = address;
        }
        private Client()
        {

        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string ContactNumber { get; private set; }
        public string Email { get; private set; }
        public Guid AddressId { get; private set; }
        public Address Address { get; private set; }
        public IEnumerable<Vehicle> Vehicles => _vehicles.AsReadOnly();

        public void AddVehicle(Vehicle vehicle)
        {
            _vehicles.Add(vehicle);
        }

        private bool IsPhoneNumber(string number)
        {
            return Regex.Match(number, @"^(\+[0-9]{9})$").Success;
        }

        private bool IsValidEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }
    }
}
