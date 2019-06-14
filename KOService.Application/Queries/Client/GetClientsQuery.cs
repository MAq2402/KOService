using KOService.Application.DTOs.Client;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Commands.Repair
{
    public class GetClientsQuery : IRequest<IEnumerable<ClientForCreationDto>>
    {
    }
}
