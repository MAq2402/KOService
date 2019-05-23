using KOService.Application.Commands.Employee;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Employee
{
    public class UpdateEmployeeHandler : RequestHandler<UpdateEmployeeCommand>
    {
        private KOServiceDbContext _dbContext;
        public UpdateEmployeeHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(UpdateEmployeeCommand request)
        {
            var employee = _dbContext.Employees
                                     .Include(e => e.Identity)
                                     .FirstOrDefault(e => e.Id.ToString() == request.Id);

            employee.Update(request.FirstName, request.LastName, request.EmployeeRole);

            _dbContext.SaveChanges();
        }
    }
}
