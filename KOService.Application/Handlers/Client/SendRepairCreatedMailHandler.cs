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
    class SendRepairCreatedMailHandler : IRequestPostProcessor<CreateRepairCommand, Unit>
    {
        private readonly IMailSender _mailSender;

        public SendRepairCreatedMailHandler(IMailSender mailSender)
        {
            _mailSender = mailSender;     
        }

        public Task Process(CreateRepairCommand request, Unit response)
        {
            string receiverAddress = request.Client.Email;
            string receiverName = $"{request.Client.FirstName} {request.Client.LastName}";
            _mailSender.SendMail(receiverAddress, receiverName, $"Twój numer naprawy to:{request.Repair.Id} .<br>");
            return Task.FromResult(0);
        }
    }
}
