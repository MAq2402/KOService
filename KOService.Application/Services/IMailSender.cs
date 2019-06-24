using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Application.Services
{
    public interface IMailSender
    {
        void SendMail(string receiverAddress,string receiverName, string mailMessage);
    }
}
