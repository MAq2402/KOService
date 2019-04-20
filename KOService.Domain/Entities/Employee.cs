using KOService.Domain.Authentication;
using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Employee : Entity
    {
        private Employee()
        {

        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string IdentityId { get; private set; }
        public Identity Identity { get; private set; }
        public ICollection<Activity> Activities { get; private set; } = new List<Activity>();
        public ICollection<Repair> Repairs { get; private set; } = new List<Repair>();
        public void AddRepair(string description, Vehicle vehicle, Client client)
        {
            if (Identity.EmployeeRole != EmployeeRole.Manager)
            {
                throw new DomainException("Only manager is allowed to add repair");
            }

            if(!client.Vehicles.Any(v => v == vehicle))
            {
                throw new DomainException("Client does not own this vehicle");
            }

            var repair = new Repair(description, Id, vehicle.Id);

            Repairs.Add(repair);
        }
    }
}
