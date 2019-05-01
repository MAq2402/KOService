using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Activity
{
    public class ActivityForCreationDto
    {
        public Guid Id { get; set; }
        public string Desccription { get; set; }
        public int SequenceNumber { get; set; }
    }
}
