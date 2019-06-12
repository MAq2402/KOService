using KOService.Application.Commands.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using KOService.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using KOService.Application.Commands.Pricing;

namespace KOService.Application.Handlers.Activity
{
    public class CreatePricingHandler : RequestHandler<CreatePricingCommand>
    {
        KOServiceDbContext _dbContext;
        public CreatePricingHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(CreatePricingCommand request)
        {
            var repair = _dbContext.Repairs.FirstOrDefault(rep => rep.Id == request.RepairId);
            if (repair == null)
            {
                throw new Exception("Could not create pricing for unknown repair");
            }
            else
            {

                Pricing pricing = new Pricing(new Guid(), request.RepairId, request.Labour);
                List<Part> parts = new List<Part>();
                foreach(var item in request.Parts)
                {
                    Part part = new Part(item.Id, item.Name, item.Manufacturer, item.ManufacturerId, item.Price);
                    parts.Add(part);
                }
                pricing.AddParts(parts);

                _dbContext.Pricings.Add(pricing);

                if (_dbContext.SaveChanges() == 0)
                {
                    throw new Exception("Could not create pricing");
                }
            }
        }
    }
}
