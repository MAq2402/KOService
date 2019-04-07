using KOService.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Repair: Entity
    {
        private readonly Dictionary<RepairStatus, string> statusDictionary = new Dictionary<RepairStatus, string>()
        {
            {RepairStatus.Open, "OPN" },
            {RepairStatus.InProgress, "PRO" },
            {RepairStatus.Canceled, "CAN" },
            {RepairStatus.Finished, "FIN" }
        };
        public string Description { get; set; }
        public string Status { get; private set; }
        public DateTime StartDateTime { get; set; } = DateTime.UtcNow;
        public DateTime EndDateTime { get; set; }

        public RepairStatus GetStatus()
        {
            return statusDictionary.FirstOrDefault(x => x.Value == Status).Key;
        }
        public void SetStatus(RepairStatus status)
        {
            Status = statusDictionary[status];
        }
    }
}
