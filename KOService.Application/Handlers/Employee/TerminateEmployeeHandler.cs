using KOService.Application.Commands.Employee;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Employee
{
    public class TerminateEmployeeHandler : RequestHandler<TerminateEmployeeCommand>
    {
        private KOServiceDbContext _dbContext;

        public TerminateEmployeeHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(TerminateEmployeeCommand request)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.Id.ToString() == request.Id);

            if(employee != null)
            {
                employee.Terminate();
            }

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not terminate employee");
            }
        }
    }
}
