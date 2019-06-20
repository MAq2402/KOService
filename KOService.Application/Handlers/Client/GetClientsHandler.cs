using AutoMapper;
using KOService.Application.Commands.Repair;
using KOService.Application.DTOs.Client;
using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
using KOService.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Text;

namespace KOService.Application.Handlers.Vehicle
{
    public class GetClientsHandler : RequestHandler<GetClientsQuery, IEnumerable<ClientForCreationDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetClientsHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<ClientForCreationDto> Handle(GetClientsQuery request)
        {
            return Mapper.Map<IEnumerable<ClientForCreationDto>>(_dbContext.Clients);
        }

    }
}
