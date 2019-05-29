using KOService.Application.Commands.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Activity
{
    public class ChangeToInProgressActivityHandler : RequestHandler<ChangeToInProgressActivityCommand>
    {
        KOServiceDbContext _dbContext;
        public ChangeToInProgressActivityHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(ChangeToInProgressActivityCommand request)
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
