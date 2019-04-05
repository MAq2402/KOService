using KOService.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Repositories.Abstract
{
    public interface IEmployeeRepository: IRepository<Employee>
    {
        Employee GetEmployeeWithIdentity(Guid id);
        Employee GetEmployeeByIdentityName(string name);
    }
}
