using AutoMapper;
using KOService.Application.DTOs;
using KOService.Application.Queries.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace KOService.Application.Handlers.Repair
{

    public class GetRepairPricingHandler : RequestHandler<GetRepairPricingQuery, PricingDto>
    {
        private KOServiceDbContext _dbContext;

        public GetRepairPricingHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        

        protected override PricingDto Handle(GetRepairPricingQuery request)
        {
            
            var pricing = _dbContext.Pricings.Include(p => p.Parts)
                 .FirstOrDefault(p => p.ClientRepairNumber == request.RepairNumber);

            return Mapper.Map<PricingDto>(pricing);
        }
    }
}
