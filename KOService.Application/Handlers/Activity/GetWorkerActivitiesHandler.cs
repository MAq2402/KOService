﻿using AutoMapper;
using KOService.Application.DTOs.Activity;
using KOService.Application.DTOs.Employee;
using KOService.Application.Queries.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace KOService.Application.Handlers.Activity
{
    class GetWorkerActivitiesHandler : RequestHandler<GetWorkerActivitiesQuery, IEnumerable<ActivityDto>>
    {
        private KOServiceDbContext _dbContext;

        public GetWorkerActivitiesHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected override IEnumerable<ActivityDto> Handle(GetWorkerActivitiesQuery request)
        {


            var activities = _dbContext.Activities.Where(a => a.MechanicId == request.MechanicId)

                .Include(a => a.Repair)
                    .ThenInclude(r => r.Vehicle)
                    .ThenInclude(v => v.Type).AsQueryable(); 
                   
            if (!string.IsNullOrEmpty(request.Status))
            {
                activities = ApplyFilter(activities, request);
            }

            return Mapper.Map<IEnumerable<ActivityDto>>(activities);
        }

        private IQueryable<Domain.Entities.Activity> ApplyFilter(IQueryable<Domain.Entities.Activity> activities, GetWorkerActivitiesQuery request)
        {
            string predicate = BuildPredicate(request.Status);

            return activities.Where(predicate);
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
