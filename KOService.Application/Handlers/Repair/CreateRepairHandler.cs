using KOService.Application.Commands.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class CreateRepairHandler : RequestHandler<CreateRepairCommand>
    {
        private KOServiceDbContext _dbContext;

        public CreateRepairHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(CreateRepairCommand request)
        {
            var client = _dbContext.Clients.Include(c => c.Vehicles).FirstOrDefault(c => c.Id.ToString() == request.ClientId);

            var manager = _dbContext.Employees.Include(e => e.Identity).FirstOrDefault(e => e.Id.ToString() == request.ManagerId);

            if(client == null)
            {
                //Create Client
                
            }

            var vehicle = client.Vehicles.FirstOrDefault(v => v.Id.ToString() == request.VehicleId);

            if (vehicle == null)
            {
                // Create vehicle
            }

            manager.AddRepair(request.Description, vehicle, client);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not create new repair");
            }
        }
    }
}
