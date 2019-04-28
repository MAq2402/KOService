using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Activity: EmployeeTask<ActivityStatus>
    {
        public Activity(Guid id): base(id)
        {
            
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
        public override void Cancel(string result)
        {
            base.Cancel(result);
            SetStatus(ActivityStatus.Canceled);
        }
        public override void Finish(string result)
        {
            base.Finish(result);
            SetStatus(ActivityStatus.Finished);
        }
        public override void ChangeToInProgress()
        {
            base.ChangeToInProgress();
            SetStatus(ActivityStatus.InProgress);
        }
        protected override void Open()
        {
            base.Open();
            SetStatus(ActivityStatus.Open);
        }
    }
}
