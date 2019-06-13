using KOService.Application.DTOs.Client;
using KOService.Application.DTOs.Repair;
using KOService.Application.DTOs.Vehicle;
using MediatR;
using System;
using System.Text;

using KOService.Application.Commands.Client;

namespace KOService.Application.Commands.Repair
{
    public class CreateRepairCommand : IRequest, IRepairMailNotificationRequest
    {
        public RepairForCreationDto Repair { get; set; }
        public Guid ManagerId { get; set; }
        public VehicleForCreationDto Vehicle { get; set; }
        public ClientForCreationDto Client { get; set; }

        public string MailRepairId => Repair.Id.ToString();
        public string MailMessage => $"Twój numer naprawy to: {Repair.Id} <br>";
    }
}
