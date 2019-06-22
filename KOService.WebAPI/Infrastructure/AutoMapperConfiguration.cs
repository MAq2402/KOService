using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Application.DTOs;
using KOService.Application.DTOs.Activity;
using KOService.Application.DTOs.Client;
using KOService.Application.DTOs.Employee;
using KOService.Application.DTOs.Repair;
using KOService.Application.DTOs.Vehicle;
using KOService.Domain.Authentication;
using KOService.Domain.Entities;


namespace KOService.WebAPI.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Employee, EmployeeDto>()
                   .ForMember(dest => dest.Role , opt => opt.MapFrom(src => src.Identity.EmployeeRole));
                cfg.CreateMap<RegisterCommand, Employee>();
                cfg.CreateMap<RegisterCommand, Identity>();

                cfg.CreateMap<Repair, RepairDto>()
                   .ForMember(dest => dest.VehicleBrand, opt => opt.MapFrom(src => src.Vehicle.Type.Brand))
                   .ForMember(dest => dest.VehicleModel, opt => opt.MapFrom(src => src.Vehicle.Type.Model))
                   .ForMember(dest => dest.VehicleRegistrationNumbers, opt => opt.MapFrom(src => src.Vehicle.RegistrationNumbers))
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));

                cfg.CreateMap<Activity, ActivityDto>()
                   .ForMember(dest => dest.MechanicName, opt => opt.MapFrom(src => $"{src.Mechanic.FirstName} {src.Mechanic.LastName}"))
                   .ForMember(dest => dest.VehicleBrand, opt => opt.MapFrom(src => src.Repair.Vehicle.Type.Brand))
                   .ForMember(dest => dest.VehicleRegistrationNumbers, opt => opt.MapFrom(src => src.Repair.Vehicle.RegistrationNumbers))
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));
                cfg.CreateMap<Activity, ActivityForClientDto>()
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));

                cfg.CreateMap<Employee, WorkersWithActivitiesDto>();

                cfg.CreateMap<Repair, RepairInfoDto>()
                   .ForMember(dest => dest.VehicleBrand, opt => opt.MapFrom(src => src.Vehicle.Type.Brand))
                   .ForMember(dest => dest.VehicleModel, opt => opt.MapFrom(src => src.Vehicle.Type.Model))
                   .ForMember(dest => dest.ClientEmail, opt => opt.MapFrom(src => src.Vehicle.Client.ContactDetails.Email))
                   .ForMember(dest => dest.ClientPhoneNumber, opt => opt.MapFrom(src => src.Vehicle.Client.ContactDetails.PhoneNumber))
                   .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => $"{src.Vehicle.Client.FirstName} {src.Vehicle.Client.LastName}"))
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));

                cfg.CreateMap<Pricing, PricingDto>()
                    .ForMember(dest => dest.totalPrice, opt => opt.MapFrom(src => src.GetAmountToPay()));
                

                cfg.CreateMap<Employee, EmployeeWithAccountInfoDto>()
                   .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Identity.UserName));
                cfg.CreateMap<Repair, RepairForClientDto>()
                    .ForMember(dest => dest.VehicleBrand, opt => opt.MapFrom(src => src.Vehicle.Type.Brand))
                   .ForMember(dest => dest.VehicleModel, opt => opt.MapFrom(src => src.Vehicle.Type.Model));
                

                cfg.CreateMap<Client, ClientForCreationDto>()
                   .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Address.City))
                   .ForMember(dest => dest.Street, opt => opt.MapFrom(src => src.Address.Street))
                   .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.Address.Code))
                   .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ContactDetails.Email))
                   .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                   .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                   .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ContactDetails.PhoneNumber))
                   .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));
                 
                cfg.CreateMap<Vehicle, VehicleForCreationDto>()
                   .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                   .ForMember(dest => dest.Model, opt => opt.MapFrom(src => src.Type.Model))
                   .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Type.Brand))
                   .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.TypeId))
                   .ForMember(dest => dest.RegistrationNumbers, opt => opt.MapFrom(src => src.RegistrationNumbers));

            });
            //Mapper.AssertConfigurationIsValid();


        }
    }
}
