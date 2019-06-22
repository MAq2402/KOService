using KOService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.DTOs.Activity
{
    public class ActivityForClientDto
    {
       public string Description { get; set; }
       public ActivityStatus Status { get; set; }
    }
}
