using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Address: Entity
    {
        public Address(Guid id, string city, string code, string street) : base(id)
        {
            if (string.IsNullOrEmpty(city))
            {
                throw new DomainException("City has not been provided");
            }

            if (string.IsNullOrEmpty(code))
            {
                throw new DomainException("Code has not been provided");
            }

            if (string.IsNullOrEmpty(street))
            {
                throw new DomainException("Street has not been provided");
            }

            City = city;
            Code = code;
            Street = street;
        }

        private Address()
        {

        }

        public string City { get; private set; }
        public string Code { get; private set; }
        public string Street { get; private set; }
        public Client Client { get; private set; }
    }
}
