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
        private readonly List<Activity> _activities = new List<Activity>();
        private readonly List<Repair> _repairs = new List<Repair>();
        public Employee() { }
        public Employee(Guid id) : base(id)
        {

        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string IdentityId { get; private set; }
        public Identity Identity { get; private set; }
        public IEnumerable<Repair> Repairs => _repairs.AsReadOnly();
        public IEnumerable<Activity> Activities => _activities.AsReadOnly();

        //Do wywalenia jak ktoś wymyśli lepszy sposob seedowania danych...
        
        public Employee(Guid id,string firstname, string lastName, EmployeeRole role) : base(id)
        {
            FirstName = firstname;
            LastName = lastName;
            Identity = new Identity();
            Identity.EmployeeRole = role;
        }
        
    }
}
