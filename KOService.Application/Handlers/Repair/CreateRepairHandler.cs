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
            var client = _dbContext.Clients.Include(c => c.Vehicles).FirstOrDefault(c => c.Id == request.Client.Id);

            var manager = _dbContext.Employees.Include(e => e.Identity).FirstOrDefault(e => e.Id == request.ManagerId);

            if (client == null)
            {
                CreateClientWithVehicle(request);
            }
            else
            { 
                if (!client.Vehicles.Any(v => v.Id == request.Vehicle.Id))
                {
                    AssignVehicleToClient(request, client);
                }
            }

            manager.AddRepair(request.Repair.Id, request.Repair.Description, request.Vehicle.Id);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not create new repair");
            }
        }
        private static void CreateClientWithVehicle(CreateRepairCommand request)
        {
            var address = Mapper.Map<Address>(request.Client.Address);
            var client = new Client(request.Client.Id, request.Client.FirstName, request.Client.LastName, request.Client.ContactNumber, request.Client.Email, address);
            client.AddVehicle(request.Vehicle.Id, request.Vehicle.RegistrationNumbers, request.Vehicle.TypeId);
        }

        private void AssignVehicleToClient(CreateRepairCommand request, Client client)
        {
            if (_dbContext.VehicleTypes.Any(vt => vt.Id == request.Vehicle.TypeId))
            {
                client.AddVehicle(request.Vehicle.Id, request.Vehicle.RegistrationNumbers, request.Vehicle.TypeId);
            }
            else
            {
                client.AddVehicle(request.Vehicle.Id, request.Vehicle.RegistrationNumbers, request.Vehicle.Brand, request.Vehicle.Model);
            }
        }
    }
}
