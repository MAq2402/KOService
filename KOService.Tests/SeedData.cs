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
            dbContext.Activities.Add(new Domain.Entities.Activity(Guid.NewGuid(),Guid.NewGuid(), "wymiana silnika", 0));
            dbContext.SaveChanges();
        }
    }
}
