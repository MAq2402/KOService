using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class ActivityType: Entity
    {
        public string Name { get; set; }
        public ICollection<Activity> Activities { get; private set; } = new List<Activity>();
    }
}
