﻿using KOService.Application.DTOs.Repair;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Queries.Repair
{
    public class GetRepairsQuery : IRequest<IEnumerable<RepairDto>>
    {
        public string Status { get; set; }
    }
}
