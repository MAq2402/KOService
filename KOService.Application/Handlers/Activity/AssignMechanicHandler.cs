﻿using KOService.Application.Commands.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace KOService.Application.Handlers.Activity
{
    public class AssignMechanicHandler : RequestHandler<AssignMechanicCommand>
    {
        KOServiceDbContext _dbContext;
        public AssignMechanicHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(AssignMechanicCommand request)
        {
            var activity = _dbContext.Activities.FirstOrDefault(x => x.Id == request.ActivityId);
            if (activity != null)
            {
                var mechanic = _dbContext.Employees.Include(e=>e.Identity).
                    FirstOrDefault(m => m.Id == request.MechanicId);

                if (mechanic != null)
                {
                    activity.AssignMechanic(mechanic);
                }
                else throw new Exception("cannot find mechanic");

            }
            else throw new Exception("cannot find activity");

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not assign mechanic");
            }

        }
    }
}
