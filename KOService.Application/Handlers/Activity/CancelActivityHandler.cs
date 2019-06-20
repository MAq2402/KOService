using KOService.Application.Commands.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Activity
{
    public class CancelActivityHandler : RequestHandler<CancelActivityCommand>
    {
        KOServiceDbContext _dbContext;
        public CancelActivityHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(CancelActivityCommand request)
        {
            var activity = _dbContext.Activities.FirstOrDefault(a => a.Id == request.ActivityId);
            if(activity != null)
            {
                activity.Cancel(request.Comment);
            }
            else throw new Exception("Connot find activity");

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not cancel activity");
            }
        }
        
    }
}
