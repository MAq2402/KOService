using AutoMapper;
using KOService.Application.DTOs;
using KOService.Application.DTOs.Repair;
using KOService.Application.Queries.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace KOService.Application.Handlers.Repair
{

    public class GetRepairForClientHandler : RequestHandler<GetRepairForClientQuery, RepairForClientDto>
    {
        private KOServiceDbContext _dbContext;

        public GetRepairForClientHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        

        protected override RepairForClientDto Handle(GetRepairForClientQuery request)
        {
            
            var repair = _dbContext.Repairs.Include(r => r.Activities)
                                           .Include(r=>r.Vehicle)
                                           .ThenInclude(v=>v.Type)
                                           .Include(r=>r.Pricing)
                                           .ThenInclude(p=>p.Parts)
                 .FirstOrDefault(r => r.Pricing.ClientRepairNumber == request.RepairNumber);

            return Mapper.Map<RepairForClientDto>(repair);
        }
    }
}
