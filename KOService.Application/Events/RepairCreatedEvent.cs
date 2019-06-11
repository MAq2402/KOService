using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace KOService.Application.Events
{
    class RepairCreatedEvent : INotification
    {
        public RepairCreatedEvent(Guid repairId, string userMail)
        {
            RepairId = repairId;
            UserMail = userMail;
        }

        public Guid RepairId{get; }
        public string UserMail{get; }

    }
}
