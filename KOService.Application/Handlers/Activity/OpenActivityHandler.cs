﻿using KOService.Application.Commands.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Activity
{
    public class OpenActivityHandler : RequestHandler<OpenActivityCommand>
    {
        KOServiceDbContext _dbContext;
        public OpenActivityHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(OpenActivityCommand request)
        {
            var activity = _dbContext.Activities.FirstOrDefault(a => a.Id == request.ActivityId);
            if (activity != null)
            {
                activity.ChangeToInProgress();
            }
            else throw new Exception("Connot find activity");

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not open activity");
            }
        }

    }
}
