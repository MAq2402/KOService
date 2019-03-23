using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Employee: Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
