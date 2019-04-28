using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.RegularExpressions;

namespace KOService.Domain.ValueObjects
{
    public class ContactDetails : ValueObject
    {
        public ContactDetails(string phoneNumber, string email)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                throw new DomainException("Contact number has not been provided");
            }

            if (!IsPhoneNumber(phoneNumber))
            {
                throw new DomainException("Contact number has wrong format");
            }

            if (string.IsNullOrEmpty(email))
            {
                throw new DomainException("Email has not been provided");
            }

            if (!IsValidEmail(email))
            {
                throw new DomainException("Email is incorrect");
            }

            PhoneNumber = phoneNumber;
            Email = email;
        }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return  PhoneNumber;

            yield return Email;
        }

        private bool IsPhoneNumber(string number)
        {
            return Regex.Match(number, @"^([0-9]{9})$").Success;
        }

        private bool IsValidEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }
    }
}
