using KOService.Application.Commands.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class FinishRepairHandler : RequestHandler<FinishRepairCommand>
    {
        private KOServiceDbContext _dbContext;
        public FinishRepairHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(FinishRepairCommand request)
        {
            var repair = _dbContext.Repairs.FirstOrDefault(r => r.Id.ToString() == request.Id);

            repair.Finish(request.Result);
        }
    }
}
