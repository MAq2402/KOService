using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Client : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public Guid AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<Vehicle> Vehicles { get; private set; } = new List<Vehicle>();

    }
}
