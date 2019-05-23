using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Domain.Authentication;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Handlers.Authentication
{
    public class RegisterCommandHandler : RequestHandler<RegisterCommand>
    {
        private KOServiceDbContext _dbContext;

        public RegisterCommandHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(RegisterCommand request)
        {
            var employee = new Domain.Entities.Employee(Guid.NewGuid(),request.FirstName, request.LastName, request.IdentityId);
            _dbContext.Employees.Add(employee);

            if(_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not register new user");
            }
        }
    }
}
