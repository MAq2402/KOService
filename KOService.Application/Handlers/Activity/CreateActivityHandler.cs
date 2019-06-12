using KOService.Application.Commands.Activity;
using KOService.Domain.DbContexts;
using MediatR;
using KOService.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace KOService.Application.Handlers.Activity
{
   public class CreateActivityHandler : RequestHandler<CreateActivityCommand>
    {
        KOServiceDbContext _dbContext;
        public CreateActivityHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(CreateActivityCommand request)
        {
            var repair = _dbContext.Repairs.FirstOrDefault(rep => rep.Id == request.RepairId);
            if (repair == null)
            {
                throw new Exception("Could not create activity for unknown repair");
            }
            else
            {

                Domain.Entities.Activity activity = new Domain.Entities.Activity(Guid.NewGuid(), request.RepairId,
                    request.Description, request.SequenceNumber);

                _dbContext.Activities.Add(activity);

                if (_dbContext.SaveChanges() == 0)
                {
                    throw new Exception("Could not create activity");
                }
            }
        }
    }
}
