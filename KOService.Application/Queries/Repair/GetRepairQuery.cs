using KOService.Application.DTOs.Employee;
using MediatR;

namespace KOService.Application.Queries.Repair
{
    public class GetRepairQuery : IRequest<EmployeeDto>
    {
        public string Id { get; set; }
    }
}
