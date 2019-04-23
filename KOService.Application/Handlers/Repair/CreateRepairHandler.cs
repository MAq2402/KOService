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
            var client = _dbContext.Clients.Include(c => c.Address).Include(c => c.Vehicles).FirstOrDefault(c => c.Id == request.Client.Id);

            var manager = _dbContext.Employees.Include(e => e.Identity).Include(m => m.Repairs).FirstOrDefault(e => e.Id == request.ManagerId);

            var vehicle = _dbContext.Vehicles.Include(v => v.Type).Include(v => v.Repairs).FirstOrDefault(v => v.Id == request.Vehicle.Id);

            Domain.Entities.Repair repair;
            if (client == null)
            {
                var address = Mapper.Map<Address>(request.Client.Address);
                client = new Client(request.Client.Id, request.Client.FirstName, request.Client.LastName, request.Client.ContactNumber, request.Client.Email, address);
                _dbContext.Clients.Add(client);
                if (_dbContext.VehicleTypes.Any(vt => vt.Id == request.Vehicle.TypeId))
                {
                    vehicle = new Vehicle(request.Vehicle.Id, request.Vehicle.RegistrationNumbers, client.Id, request.Vehicle.TypeId);
                }
                else
                {
                    vehicle = new Vehicle(request.Vehicle.Id, client.Id, request.Vehicle.RegistrationNumbers, request.Vehicle.Brand, request.Vehicle.Brand);
                }
                client.AddVehicle(vehicle);
                repair = new Domain.Entities.Repair(request.Repair.Id, request.Repair.Description, manager.Id, vehicle.Id);
                vehicle.AddRepair(repair);
                manager.AddRepair(repair);
            } 
            else if(!client.Vehicles.Any(v => v == vehicle))
            {
                if (_dbContext.VehicleTypes.Any(vt => vt.Id == request.Vehicle.TypeId))
                {
                    vehicle = new Vehicle(request.Vehicle.Id, request.Vehicle.RegistrationNumbers, client.Id, request.Vehicle.TypeId);
                }
                else
                {
                    vehicle = new Vehicle(request.Vehicle.Id, client.Id, request.Vehicle.RegistrationNumbers, request.Vehicle.Brand, request.Vehicle.Brand);
                }
                client.AddVehicle(vehicle);
                repair = new Domain.Entities.Repair(request.Repair.Id, request.Repair.Description, manager.Id, vehicle.Id);
                vehicle.AddRepair(repair);
                manager.AddRepair(repair);
            }
            else
            {
                repair = new Domain.Entities.Repair(request.Repair.Id, request.Repair.Description, manager.Id, vehicle.Id);
                //vehicle.AddRepair(repair);
                manager.AddRepair(repair);
            }
          

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not create new repair");
            }
        }
    }
}
