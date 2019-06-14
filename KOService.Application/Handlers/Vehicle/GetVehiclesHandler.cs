using AutoMapper;
using KOService.Application.Commands.Repair;
using KOService.Application.DTOs.Repair;
using KOService.Application.DTOs.Vehicle;
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
    public class GetVehiclesHandler : RequestHandler<GetVehiclesQuery, IEnumerable<VehicleForCreationDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetVehiclesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        protected override IEnumerable<VehicleForCreationDto> Handle(GetVehiclesQuery request)
        {
            return Mapper.Map<IEnumerable<VehicleForCreationDto>>(_dbContext.Vehicles);
        }
        
    }
}
