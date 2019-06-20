using AutoMapper;
using KOService.Application.Commands.Authentication;
using KOService.Domain.DbContexts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using KOService.Domain.Entities;

namespace KOService.Tests
{
    public static class SeedData
    {
        public static void PopulateTestData(KOServiceDbContext dbContext)
        {


            dbContext.Activities.Add(new Domain.Entities.Activity(new Guid("d2157b7a-c81e-47dc-9d5f-a4a33f5d5587"), new Guid("f87cfd0f-1e90-4803-91fe-8269d4c69153"), "wymiana silnika", 0));
            dbContext.Repairs.Add(new Domain.Entities.Repair(new Guid("3297fa03-afa0-495c-965e-c9b3b712358f"), "naprawa bwm e39", Guid.NewGuid(), Guid.NewGuid()));
            dbContext.Employees.Add(new Domain.Entities.Employee(new Guid("4cd4ac80-867c-468c-9149-8de382edef44"), "Janusz", "Mechank", Domain.Authentication.EmployeeRole.Mechanic));
           
            if (dbContext.SaveChanges() == 0)
            {
                throw new Exception("cannot seed data!");
            }
            

        }
    }
}

