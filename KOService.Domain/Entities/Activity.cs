using KOService.Domain.Enums;
using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Activity: EmployeeTask<ActivityStatus>
    {
        public Activity(Guid id,Guid repairId, string description, int sequenceNumber): base(id)
        {
            Description = description;
            SequenceNumber = sequenceNumber;
            RepairId = repairId;
            Open();
        }
        protected override Dictionary<ActivityStatus, string> StatusDictionary => statusDictionary;

        private readonly Dictionary<ActivityStatus, string> statusDictionary = new Dictionary<ActivityStatus, string>()
        {
            {ActivityStatus.Open, "OPN" },
            {ActivityStatus.InProgress, "PRO" },
            {ActivityStatus.Canceled, "CAN" },
            {ActivityStatus.Finished, "FIN" }
        };
        public int SequenceNumber { get; set; }
        public Guid RepairId { get; set; }
        public Repair Repair { get; set; }
        public Guid? MechanicId { get; set; }
        public Employee Mechanic { get; set; }
        public void Cancel(string result)
        {
            if (GetStatus() != ActivityStatus.InProgress)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }

            if (string.IsNullOrEmpty(result))
            {
                throw new DomainException("Result has not been provided, while canceling");
            }

            EndDateTime = DateTime.UtcNow;

            Result = result;

            SetStatus(ActivityStatus.Canceled);
        }
        public void Finish(string result)
        {
            if (GetStatus() != ActivityStatus.InProgress)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }

            EndDateTime = DateTime.UtcNow;

            Result = result;

            SetStatus(ActivityStatus.Finished);
        }
        public void ChangeToInProgress()
        {
            SetStatus(ActivityStatus.InProgress);
        }
        private void Open()
        {
            StartDateTime = DateTime.UtcNow;
            SetStatus(ActivityStatus.Open);
        }
        public void AssignMechanic(Employee employee)
        {
            if (Mechanic == null)
            {
                if (employee.Identity.EmployeeRole == Authentication.EmployeeRole.Mechanic)
                {
                    MechanicId = employee.Id;
                    Open();
                }
                else throw new DomainException("Worker you want to assign is not a mechanic");
            }
            else throw new DomainException("Mechanic was already assigned for that task");
        }
    }
}
