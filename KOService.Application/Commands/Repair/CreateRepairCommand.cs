using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class CreateRepairCommand : IRequest
    {
        public CreateRepairCommand()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string ManagerId { get; set; }
        public string VehicleId { get; set; }
        public string ClientId { get; set; }
    }
}
