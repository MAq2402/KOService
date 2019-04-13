using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Activity: Entity
    {
        public Guid ActivityTypeId { get; set; }
        public ActivityType ActivityType { get; set; }
        public int SequenceNumber { get; set; }
        public string Description { get; set; }
        public string Result { get; set; }
        public ActivityStatus Status { get; set; }
        public DateTime RequestTime { get; set; }
        public DateTime ClosedTime { get; set; }
        public Guid RequestId { get; set; }
        //public Request Request { get; set; }
        public Guid WorkerId { get; set; }
        public Employee Worker { get; set; }
    }
}
