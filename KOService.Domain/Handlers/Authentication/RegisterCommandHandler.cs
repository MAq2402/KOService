using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Domain.Entities;
using KOService.Domain.Repositories.Abstract;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Handlers.Authentication
{
    public class RegisterCommandHandler : RequestHandler<RegisterCommand>
    {
        private IRepository<Domain.Entities.Employee> _employeeRepository;

        public RegisterCommandHandler(IRepository<Domain.Entities.Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        protected override void Handle(RegisterCommand request)
        {
            var customer = Mapper.Map<Domain.Entities.Employee>(request);

            _employeeRepository.Add(customer);

            if (!_employeeRepository.Commit())
            {
                throw new Exception("Could not add employee");
            }
        }
    }
}
