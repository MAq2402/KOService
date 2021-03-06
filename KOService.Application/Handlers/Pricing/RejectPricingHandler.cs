﻿using KOService.Application.Commands.Pricing;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Pricing
{
    public class RejectPricingHandler : RequestHandler<RejectPricingCommand>
    {
        private KOServiceDbContext _dbContext;

        public RejectPricingHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(RejectPricingCommand request)
        {
            var repair = _dbContext.Repairs.Include(r => r.Pricing)
               .FirstOrDefault(r => r.Pricing.ClientRepairNumber == request.RepairNumber);

            if (repair != null)
            {
                repair.PricingRejected();
            }

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not accept pricing");
            }
        }
    }
}
