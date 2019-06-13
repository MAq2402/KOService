using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using KOService.Application.Commands.Client;

namespace KOService.Application.Commands.Repair
{
    public class FinishRepairCommand : IRequest, IRepairMailNotificationRequest
    {
        public string Id { get; set; }
        public string Result { get; set; }
        
        public string MailRepairId => Id;
        public string MailMessage => "Twoja naprawa została zakończona <br>";
    }
}
