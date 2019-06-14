using KOService.Application.DTOs.Vehicle;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class GetVehiclesQuery : IRequest<IEnumerable<VehicleForCreationDto>>
    {
    }
}
