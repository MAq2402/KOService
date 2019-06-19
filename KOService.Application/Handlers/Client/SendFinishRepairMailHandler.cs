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
    class SendFinishRepairMailHandler: IRequestPostProcessor<FinishRepairCommand, Unit>
    {
        private readonly IMailSender _mailSender;
        private KOServiceDbContext _dbContext;

        public SendFinishRepairMailHandler(KOServiceDbContext dbContext, IMailSender mailSender)
        {
            _mailSender = mailSender;
            _dbContext = dbContext;
        }

        public Task Process(FinishRepairCommand request, Unit response)
        {
            var repair = _dbContext.Repairs.Where(r => r.Id.ToString() == request.Id)
              .Include(r => r.Vehicle)
              .ThenInclude(v => v.Client)
              .FirstOrDefault();

            string receiverAddress = repair.Vehicle.Client.ContactDetails.Email;
            string receiverName = $"{repair.Vehicle.Client.FirstName} {repair.Vehicle.Client.LastName}";
            _mailSender.SendMail(receiverAddress, receiverName, "Twoja naprawa została zakończona.<br>");
            return Task.FromResult(0);
        }
    }
}
