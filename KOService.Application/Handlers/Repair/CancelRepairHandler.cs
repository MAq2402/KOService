using KOService.Application.Commands.Repair;
using KOService.Domain.DbContexts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KOService.Application.Handlers.Repair
{
    public class CancelRepairHandler : RequestHandler<CancelRepairCommand>
    {
        private KOServiceDbContext _dbContext;
        public CancelRepairHandler(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override void Handle(CancelRepairCommand request)
        {
            var repair = _dbContext.Repairs.FirstOrDefault(r => r.Id.ToString() == request.Id);

            repair.Cancel(request.Result);

            if(_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not cancel repair");
            }
        }
    }
}
