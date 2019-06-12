using KOService.Domain.Enums;
using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Repair : EmployeeTask<RepairStatus>
    {
        private readonly List<Activity> _activities = new List<Activity>();
        public Repair(Guid id, string description, Guid managerId, Guid vehicleId) : base(id)
        {
            Description = description;
            ManagerId = managerId;
            VehicleId = vehicleId;
            Open();
        }

        private readonly Dictionary<RepairStatus, string> statusDictionary = new Dictionary<RepairStatus, string>()
        {
            {RepairStatus.Open, "OPN" },
            {RepairStatus.InProgress, "PRO" },
            {RepairStatus.Canceled, "CAN" },
            {RepairStatus.Finished, "FIN" }
        };

        private Repair()
        {

        }
        protected override Dictionary<RepairStatus, string> StatusDictionary => statusDictionary;
        public IEnumerable<Activity> Activities => _activities.AsReadOnly();
        public Guid ManagerId { get; private set; }
        public Employee Manager { get; private set; }
        public Vehicle Vehicle { get; private set; }
        public Guid VehicleId { get; private set; }
        public Pricing Pricing { get; private set; }
        public Guid PricingId { get; private set; }


        public void Cancel(string result)
        {
            if(GetStatus() != RepairStatus.InProgress)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }

            if (string.IsNullOrEmpty(result))
            {
                throw new DomainException("Result has not been provided, while canceling");
            }

            EndDateTime = DateTime.UtcNow;
            Result = result;

            SetStatus(RepairStatus.Canceled);
        }
        public void Finish(string result)
        {
            if (GetStatus() != RepairStatus.InProgress)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }

            EndDateTime = DateTime.UtcNow;

            Result = result;

            SetStatus(RepairStatus.Finished);
        }
        public void ChangeToInProgress()
        {
            SetStatus(RepairStatus.InProgress);
        }
        public void PricingAccepted()
        {
            SetStatus(RepairStatus.PricingAccepted);
        }
        private void Open()
        {
            StartDateTime = DateTime.UtcNow;
            SetStatus(RepairStatus.Open);
        }
    }
}
