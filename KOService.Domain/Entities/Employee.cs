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
        public Employee(Guid id) : base(id) { }

        public Employee(Guid id, string firstName, string lastName, string identityId) : base(id)

        {
            SetFirstName(firstName);
            SetLastName(lastName);

            IdentityId = identityId;
        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string IdentityId { get; private set; }
        public Identity Identity { get; private set; }
        public DateTime? TerminationDateTime { get; private set; }
        public bool IsTerminated => TerminationDateTime.HasValue;
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
        

        public void Terminate()
        {
            if(IsTerminated)
            {
                throw new Exception("Employee has been terminated previously");
            }

            TerminationDateTime = DateTime.UtcNow;
        }

        public void Update(string firstName, string lastName, EmployeeRole role, string userName)
        {
            SetFirstName(firstName);
            SetLastName(lastName);
            SetUserName(userName);

            Identity.EmployeeRole = role;
        }

        private void SetLastName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                throw new DomainException("Last name has not been provided");
            }

            LastName = lastName;
        }

        private void SetFirstName(string firstName)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                throw new DomainException("First name has not been provided");
            }

            FirstName = firstName;
        }

        private void SetUserName(string userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                throw new DomainException("User name has not been provided");
            }

            Identity.UserName = userName;
            Identity.NormalizedUserName = userName.ToUpper();
        }

    }
}
