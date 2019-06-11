using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using KOService.Application.Events;
using MediatR;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;

namespace KOService.Application.Handlers.Repair
{
    class RepairCreatedEventHandler: NotificationHandler<RepairCreatedEvent>
    {
        protected override void Handle(RepairCreatedEvent notification)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("KOService", "koservice.gliwice@gmail.com");
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress("Klient", notification.UserMail);
            message.To.Add(to);
            message.Subject = "KOService";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<h1>KOService</h1>" +
                "Dziękujemy za skorzystanie z naszych uslug";
            bodyBuilder.TextBody = "Dziekujemy za skorzystanie z naszych uslug";

            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.CheckCertificateRevocation = false;

            client.Connect("smtp.gmail.com", 465);
            client.AuthenticationMechanisms.Remove("XOAUTH2");
            client.Authenticate("koservice.gliwice@gmail.com", "KOService123");

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
        }

        
    }
}
