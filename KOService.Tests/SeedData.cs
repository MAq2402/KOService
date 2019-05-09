using KOService.Domain.DbContexts;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Tests
{
    public static class SeedData
    {
        public static void PopulateTestData(KOServiceDbContext dbContext)
        {
            //Tu mozna dodac wlasne dane testowe
            dbContext.Activities.Add(new Domain.Entities.Activity(Guid.NewGuid(),new Guid("f87cfd0f-1e90-4803-91fe-8269d4c69153"), "wymiana silnika",0));
            dbContext.Repairs.Add(new Domain.Entities.Repair(new Guid("3297fa03-afa0-495c-965e-c9b3b712358f"), "naprawa bwm e39", Guid.NewGuid(), Guid.NewGuid()));
            dbContext.SaveChanges();
        }
    }
}
