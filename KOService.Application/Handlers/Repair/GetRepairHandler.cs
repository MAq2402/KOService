using AutoMapper;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class GetRepairHandler : RequestHandler<GetRepairQuery, EmployeeDto>
    {
        private KOServiceDbContext _dbContext;

        public GetRepairHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override EmployeeDto Handle(GetRepairQuery request)
        {
            return Mapper.Map<EmployeeDto>(_dbContext.Repairs
                         .FirstOrDefault(e => e.Id.ToString() == request.Id));
        }
    }
}
