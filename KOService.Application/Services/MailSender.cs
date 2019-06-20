using System;
using System.Collections.Generic;
using System.Text;
using MailKit.Net.Smtp;
using MimeKit;

namespace KOService.Application.Services
{
    public class MailSender : IMailSender
    {
        public void SendMail(string receiverAddress, string receiverName,  string mailMessage)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("KOService", "koservice.gliwice@gmail.com");
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress(receiverName, receiverAddress);
            message.To.Add(to);
            message.Subject = "KOService info";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<h1>KOService</h1>" + mailMessage +
                "Aby uzyskać więcej informacji przejdź do strony http://localhost:4200/client i podaj swój numer naprawy";

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
