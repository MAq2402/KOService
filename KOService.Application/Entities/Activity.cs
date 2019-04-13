using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Activity: Entity
    {

        private readonly Dictionary<ActivityStatus, string> statusDictionary = new Dictionary<ActivityStatus, string>()
        {
            {ActivityStatus.Open, "OPN" },
            {ActivityStatus.InProgress, "PRO" },
            {ActivityStatus.Canceled, "CAN" },
            {ActivityStatus.Finished, "FIN" }
        };
        public Guid ActivityTypeId { get; set; }
        public ActivityType ActivityType { get; set; }
        public int SequenceNumber { get; set; }
        public string Description { get; set; }
        public string Result { get; set; }
        public string Status { get; private set; }
        public DateTime StartDateTime { get; set; } = DateTime.UtcNow;
        public DateTime EndDateTime { get; set; }
        public Guid RepairId { get; set; }
        public Repair Repair { get; set; }
        public Guid MechanicId { get; set; }
        public Employee Mechanic { get; set; }

        public ActivityStatus GetStatus()
        {
            return statusDictionary.FirstOrDefault(x => x.Value == Status).Key;
        }
        public void SetStatus(ActivityStatus status)
        {
            if (status == ActivityStatus.Canceled || status == ActivityStatus.InProgress)
            {
                EndDateTime = DateTime.UtcNow;
            }
            Status = statusDictionary[status];
        }
    }
}
