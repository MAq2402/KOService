using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Application.DTOs.Employee;
using KOService.Domain.Authentication;
using KOService.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KOService.WebAPI.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Employee, EmployeeDto>();
                cfg.CreateMap<RegisterCommand, Employee>();
                cfg.CreateMap<RegisterCommand, Identity>()
                 .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.FirstName.Substring(0, 3) + src.LastName.Substring(0, 3)))
                 .ForAllOtherMembers(opt => opt.Ignore());
            });
        }
    }
}
