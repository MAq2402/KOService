using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace KOService.Application.Commands.Client
{
    public interface IRepairMailNotificationRequest
    {
        string MailRepairId { get; }
        string MailMessage { get; }
    }
}
