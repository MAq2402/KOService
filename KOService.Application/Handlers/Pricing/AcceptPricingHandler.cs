using KOService.Application.Commands.Pricing;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Pricing
{
    public class AcceptPricingHandler : RequestHandler<AcceptPricingCommand>
    {
        private KOServiceDbContext _dbContext;

        public AcceptPricingHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(AcceptPricingCommand request)
        {
            var repair = _dbContext.Repairs.FirstOrDefault(r => r.Id == request.RepairId);

            if (repair != null)
            {
                repair.PricingAccepted();
            }

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not accept pricing");
            }
        }
    }
   
}
