using KOService.Application.Commands.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class ChangeToInProgressHandler : RequestHandler<ChangeToInProgressCommand>
    {
        private KOServiceDbContext _dbContext;
        public ChangeToInProgressHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(ChangeToInProgressCommand request)
        {
            var repair = _dbContext.Repairs.FirstOrDefault(r => r.Id.ToString() == request.Id);

            repair.ChangeToInProgress();
        }
    }
}
