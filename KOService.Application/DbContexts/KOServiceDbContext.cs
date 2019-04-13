using KOService.Domain.Configuration;
using KOService.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.DbContexts
{
    public class KOServiceDbContext: IdentityDbContext
    {
        public KOServiceDbContext(DbContextOptions<KOServiceDbContext> dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new AddressConfiguration());
            builder.ApplyConfiguration(new ClientConfiguration());

            base.OnModelCreating(builder);
        }
    }
}
