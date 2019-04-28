using KOService.Domain.Exceptions;
using KOService.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.ValueObjects
{
    public class Address: ValueObject
    {
        public Address(string street, string city, string code)
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

            Street = street;
            City = city;
            Code = code;
            
        }
        public string City { get; private set; }
        public string Code { get; private set; }
        public string Street { get; private set; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return City;
            yield return Code;
            yield return Street;
        }
    }
}
