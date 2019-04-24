using AutoMapper;
using KOService.Application.Commands.Repair;
using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
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
            var client = _dbContext.Clients.Include(c => c.Address).Include(c => c.Vehicles).ThenInclude(v => v.Repairs).FirstOrDefault(c => c.Id == request.Client.Id);

            var manager = _dbContext.Employees.Include(e => e.Identity).Include(m => m.Repairs).FirstOrDefault(e => e.Id == request.ManagerId);

            var vehicle = _dbContext.Vehicles.Include(v => v.Type).Include(v => v.Repairs).FirstOrDefault(v => v.Id == request.Vehicle.Id);

            if (client == null)
            {
                client = new Client(request.Client.Id, 
                                    request.Client.FirstName, 
                                    request.Client.LastName, 
                                    request.Client.PhoneNumber, 
                                    request.Client.Email, 
                                    request.Client.Street, 
                                    request.Client.City, 
                                    request.Client.Code);
                _dbContext.Clients.Add(client);
            }
            else
            {
                client.UpdateAddress(request.Client.Street, request.Client.City, request.Client.Code);
                client.UpdateContactDetails(request.Client.PhoneNumber, request.Client.Email);
            }

            if(vehicle == null)
            {
                if (_dbContext.VehicleTypes.Any(vt => vt.Id == request.Vehicle.TypeId))
                {
                    vehicle = new Vehicle(request.Vehicle.Id, request.Vehicle.RegistrationNumbers, client.Id, request.Vehicle.TypeId);
                }
                else
                {
                    vehicle = new Vehicle(request.Vehicle.Id, client.Id, request.Vehicle.RegistrationNumbers, request.Vehicle.Brand, request.Vehicle.Brand);
                }
            }

            var repair = new Domain.Entities.Repair(request.Repair.Id, request.Repair.Description, manager.Id, vehicle.Id);

            client.AddRepair(repair, vehicle);
            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not create new repair");
            }
        }
    }
}
