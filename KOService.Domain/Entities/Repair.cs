using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Repair : EmployeeTask<RepairStatus>
    {
        public Repair(string description, Guid managerId, Guid vehicleId) : base()
        {
            Description = description;
            ManagerId = managerId;
            VehicleId = vehicleId;
        }

        private Repair() : base()
        {

        }

        private readonly Dictionary<RepairStatus, string> statusDictionary = new Dictionary<RepairStatus, string>()
        {
            {RepairStatus.Open, "OPN" },
            {RepairStatus.InProgress, "PRO" },
            {RepairStatus.Canceled, "CAN" },
            {RepairStatus.Finished, "FIN" }
        };

        protected override Dictionary<RepairStatus, string> StatusDictionary => statusDictionary;
        public ICollection<Activity> Activities { get; private set; } = new List<Activity>();
        public Guid ManagerId { get; private set; }
        public Employee Manager { get; private set; }
        public Vehicle Vehicle { get; private set; }
        public Guid VehicleId { get; private set; }

        public override void Cancel(string result)
        {
            base.Cancel(result);
            SetStatus(RepairStatus.Canceled);
        }
        public override void Finish(string result)
        {
            base.Finish(result);
            SetStatus(RepairStatus.Finished);
        }
        public override void ChangeToInProgress()
        {
            base.ChangeToInProgress();
            SetStatus(RepairStatus.InProgress);
        }
        public override void Open()
        {
            base.Open();
            SetStatus(RepairStatus.Open);
        }

    }
}
