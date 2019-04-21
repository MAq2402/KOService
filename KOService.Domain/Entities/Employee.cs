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
        private ICollection<Activity> activities = new List<Activity>();
        private ICollection<Repair> repairs = new List<Repair>();
        public Employee(Guid id) : base(id)
        {

        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string IdentityId { get; private set; }
        public Identity Identity { get; private set; }
        public IEnumerable<Repair> Repairs => repairs.ToList();
        public IEnumerable<Activity> Activities => activities.ToList();
        public void AddRepair(Guid repairId,string description, Guid vehicleId)
        {
            if (Identity.EmployeeRole != EmployeeRole.Manager)
            {
                throw new DomainException("Only manager is allowed to add repair");
            }

            var repair = new Repair(repairId ,description, Id, vehicleId);

            repairs.Add(repair);
        }
    }
}
