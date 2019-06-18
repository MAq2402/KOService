using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MediatR.Pipeline;
using MediatR;
using KOService.Application.Services;
using KOService.Domain.DbContexts;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using KOService.Application.Commands.Repair;

namespace KOService.Application.Handlers
{ 
    public class SendCancelRepairMailHandler : IRequestPostProcessor<CancelRepairCommand, Unit>
    {
        private readonly IMailSender _mailSender;
        private KOServiceDbContext _dbContext;

        public SendCancelRepairMailHandler( KOServiceDbContext dbContext, IMailSender mailSender)
         {
            _mailSender = mailSender;
            _dbContext = dbContext;
        }

        public Task Process(CancelRepairCommand request, Unit response)
        {
            var repair = _dbContext.Repairs.Where(r => r.Id.ToString() == request.Id)
              .Include(r => r.Vehicle)
              .ThenInclude(v => v.Client)
              .FirstOrDefault();

            string receiverAddress = repair.Vehicle.Client.ContactDetails.Email;
            string receiverName = $"{repair.Vehicle.Client.FirstName} {repair.Vehicle.Client.LastName}";
            _mailSender.SendMail(receiverAddress, receiverName, "Twoja naprawa została anulowana.< br >");
            return Task.FromResult(0);
        }
    }
}
