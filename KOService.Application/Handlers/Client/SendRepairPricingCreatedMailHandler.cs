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
using KOService.Application.Commands.Pricing;


namespace KOService.Application.Handlers
{
    class SendRepairPricingCreatedMailHandler : IRequestPostProcessor<CreatePricingCommand, Unit>
    {
        private readonly IMailSender _mailSender;
        private KOServiceDbContext _dbContext;

        public SendRepairPricingCreatedMailHandler(KOServiceDbContext dbContext, IMailSender mailSender)
        {
            _mailSender = mailSender;
            _dbContext = dbContext;
        }

        public Task Process(CreatePricingCommand request, Unit response)
        {
            var repair = _dbContext.Repairs.Where(r => r.Id == request.RepairId)
              .Include(r => r.Vehicle)
              .ThenInclude(v => v.Client)
              .Include(r => r.Pricing)
              .FirstOrDefault();

            string receiverAddress = repair.Vehicle.Client.ContactDetails.Email;
            string receiverName = $"{repair.Vehicle.Client.FirstName} {repair.Vehicle.Client.LastName}";
            string message = $"Twój numer naprawy to {repair.Pricing.ClientRepairNumber} .<br>";
            _mailSender.SendMail(receiverAddress, receiverName, message);
            return Task.FromResult(0);
        }
    }
}
