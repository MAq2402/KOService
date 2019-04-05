using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
using KOService.Domain.Repositories.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Domain.Repositories
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(KOServiceDbContext dbContext) : base(dbContext)
        {
        }

        public Employee GetEmployeeByIdentityName(string name)
        {
            return _dbContext.Employees.Include(e => e.Identity).FirstOrDefault(x => x.Identity.UserName == name);
        }

        public Employee GetEmployeeWithIdentity(Guid id)
        {
            return _dbContext.Employees.Include(e => e.Identity).FirstOrDefault(x => x.Id == id);
        }
    }
}
