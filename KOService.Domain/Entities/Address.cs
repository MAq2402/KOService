using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Entities
{
    public class Address: Entity
    {
        public string City { get; set; }
        public string Code { get; set; }
        public string Street { get; set; }
        public Client Client { get; set; }
    }
}
