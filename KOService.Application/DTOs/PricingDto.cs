using KOService.Application.DTOs.Part;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs
{
    public class PricingDto
    {
        public double Labour { get; set; }
        public IEnumerable<PartDto> parts { get; set; }
        public double totalPrice { get; set; }
    }
}
