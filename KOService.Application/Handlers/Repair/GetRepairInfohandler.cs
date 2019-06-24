using AutoMapper;
using KOService.Application.DTOs.Repair;
using KOService.Application.Queries.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Repair
{

    public class GetRepairInfoHandler : RequestHandler<GetRepairInfoQuery, RepairInfoDto>
    {
        private KOServiceDbContext _dbContext;

        public GetRepairInfoHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override RepairInfoDto Handle(GetRepairInfoQuery request)
        {
            var repair = _dbContext.Repairs.Where(r => r.Id == request.Id)
                .Include(r => r.Vehicle)
                .ThenInclude(v => v.Client)
                .Include(r => r.Vehicle)
                .ThenInclude(v => v.Type)
                .Include(r=>r.Pricing)
                .ThenInclude(p=>p.Parts)
                .FirstOrDefault();

            if (repair == null)
            {
                throw new Exception("Could not find repair");
            }

            return Mapper.Map<RepairInfoDto>(repair);
        }

    }
}
