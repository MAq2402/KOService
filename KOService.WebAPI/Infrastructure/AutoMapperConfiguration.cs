using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Application.DTOs.Activity;
using KOService.Application.DTOs.Address;
using KOService.Application.DTOs.Employee;
using KOService.Application.DTOs.Repair;
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
                cfg.CreateMap<RegisterCommand, Identity>();

                cfg.CreateMap<AddressForCreationDto, Address>();

                cfg.CreateMap<Repair, RepairDto>()
                   .ForMember(dest => dest.VehicleBrand, opt => opt.MapFrom(src => src.Vehicle.Type.Brand))
                   .ForMember(dest => dest.VehicleModel, opt => opt.MapFrom(src => src.Vehicle.Type.Model))
                   .ForMember(dest => dest.VehicleRegistrationNumbers, opt => opt.MapFrom(src => src.Vehicle.RegistrationNumbers))
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));

                cfg.CreateMap<Activity, ActivityDto>()
                   .ForMember(dest => dest.MechanicName, opt => opt.MapFrom(src => $"{src.Mechanic.FirstName} {src.Mechanic.LastName}"))
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));


            });
        }
    }
}
