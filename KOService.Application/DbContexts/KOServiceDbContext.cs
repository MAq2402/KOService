using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.DbContexts
{
    public class KOServiceDbContext: DbContext
    {
        public KOServiceDbContext(DbContextOptions<KOServiceDbContext> dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<Employee> Employees { get; set; }
    }
}
