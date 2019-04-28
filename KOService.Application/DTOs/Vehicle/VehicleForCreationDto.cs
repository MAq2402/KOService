using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Vehicle
{
    public class VehicleForCreationDto
    {
        public Guid Id { get; set; }
        public string RegistrationNumbers { get; set; }
        public Guid TypeId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
    }
}
