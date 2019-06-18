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
            {RepairStatus.Priced, "PRI" },
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
        public void Priced(string clientRepairNumber)
        {
            if (GetStatus() != RepairStatus.Open)
            {
                throw new DomainException($"Can't set priced when current status is {Status}");
            }
            Pricing.SetClientNumber(clientRepairNumber);
            SetStatus(RepairStatus.Priced);
        }
        public void PricingAccepted()
        {
            if (GetStatus() != RepairStatus.Priced)
            {
                throw new DomainException($"Client can't make decision when status is {Status}");
            }
            SetStatus(RepairStatus.InProgress);
        }
        public void PricingRejected()
        {
            if (GetStatus() != RepairStatus.Priced)
            {
                throw new DomainException($"Client can't make decision when status is {Status}");
            }
            Result = "Pricing was rejected";
            SetStatus(RepairStatus.Canceled);
        }

        private void Open()
        {
            StartDateTime = DateTime.UtcNow;
            SetStatus(RepairStatus.Open);
        }
        public string GenerateClientRepairNumber()
        {
            int size = 8;
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char tmp;
            for (int i = 0; i < size; i++)
            {
                tmp = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(tmp);
            }
            return builder.ToString();
        }
    }
}
