using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Activity
{
    public class ActivityForCreationDto
    {
        public ActivityForCreationDto()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int SequenceNumber { get; set; }
    }
}
