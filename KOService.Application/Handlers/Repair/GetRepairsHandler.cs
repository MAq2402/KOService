using AutoMapper;
using KOService.Application.Commands.Repair;
using KOService.Application.DTOs.Repair;
using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
using KOService.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class GetRepairsHandler : RequestHandler<GetRepairsQuery, IEnumerable<RepairDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetRepairsHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<RepairDto> Handle(GetRepairsQuery request)
        {
            var repairs = _dbContext.Repairs.Include(r => r.Activities)
                                            .ThenInclude(a => a.Mechanic)
                                            .Include(r => r.Vehicle)
                                            .ThenInclude(v => v.Type).AsQueryable();


            if (!string.IsNullOrEmpty(request.Status))
            {
                repairs = ApplyFilter(repairs, request);
            }

            return Mapper.Map<IEnumerable<RepairDto>>(repairs);
        }

        private IQueryable<Domain.Entities.Repair> ApplyFilter(IQueryable<Domain.Entities.Repair> repairs, GetRepairsQuery request)
        {
            string predicate = BuildPredicate(request.Status);

            return repairs.Where(predicate);
        }

        private static string BuildPredicate(string statusQuery)
        {
            var splittedQuery = statusQuery.Split(',');

            var predicate = string.Empty;

            foreach (var item in splittedQuery)
            {
                predicate += $"Status=\"{item}\"||";
            }

            return predicate.Substring(0, predicate.Length - 2);
            
        }
    }
}
