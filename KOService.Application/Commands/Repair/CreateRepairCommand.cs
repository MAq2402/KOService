using KOService.Application.DTOs.Client;
using KOService.Application.DTOs.Repair;
using KOService.Application.DTOs.Vehicle;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class CreateRepairCommand : IRequest
    {
        public RepairForCreationDto Repair { get; set; }
        public Guid ManagerId { get; set; }
        public VehicleForCreationDto Vehicle { get; set; }
        public ClientForCreationDto Client { get; set; }
    }
}
