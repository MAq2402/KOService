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

        public override void Cancel(string result)
        {
            if(GetStatus() != RepairStatus.InProgress)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }
            base.Cancel(result);
            SetStatus(RepairStatus.Canceled);
        }
        public override void Finish(string result)
        {
            if (GetStatus() != RepairStatus.InProgress)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }
            base.Finish(result);
            SetStatus(RepairStatus.Finished);
        }
        public override void ChangeToInProgress()
        {
            if (GetStatus() != RepairStatus.Open)
            {
                throw new DomainException($"Can't perform cancelation when current status is {Status}");
            }
            base.ChangeToInProgress();
            SetStatus(RepairStatus.InProgress);
        }
        protected override void Open()
        {
            base.Open();
            SetStatus(RepairStatus.Open);
        }

    }
}
