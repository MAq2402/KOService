using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs
{
    public class PartForCreationDto
    {
        public string Name { get;  set; }
        public string Manufacturer { get;  set; }
        public string ManufacturerId { get; set; }
        public double Price { get; set; }
    }
}
