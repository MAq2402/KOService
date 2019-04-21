using AutoMapper;
using KOService.Application.Commands.Repair;
using KOService.Application.DTOs.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class GetRepairsHandler : RequestHandler<GetRepairsQuery, IEnumerable<RepairDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetRepairsHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<RepairDto> Handle(GetRepairsQuery request)
        {
            var repairs = _dbContext.Repairs.Include(r => r.Activities)
                                            .ThenInclude(a => a.Mechanic)
                                            .Include(r => r.Vehicle)
                                            .ThenInclude(v => v.Type);

            return Mapper.Map<IEnumerable<RepairDto>>(repairs);
        }
    }
}
