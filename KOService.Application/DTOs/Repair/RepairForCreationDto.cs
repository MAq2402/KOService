using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Repair
{
    public class RepairForCreationDto
    {
        public RepairForCreationDto()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Description { get; set; }
    }
}
