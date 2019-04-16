﻿using KOService.Domain.Configuration;
using KOService.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<Repair> Repairs { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityType> ActivityTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new AddressConfiguration());
            builder.ApplyConfiguration(new ClientConfiguration());
            builder.ApplyConfiguration(new EmployeeConfiguration());
            builder.ApplyConfiguration(new VehicleConfiguration());
            builder.ApplyConfiguration(new VehicleTypeConfiguration());
            builder.ApplyConfiguration(new RepairConfiguration());
            builder.ApplyConfiguration(new ActivityConfiguration());
            builder.ApplyConfiguration(new ActivityTypeConfiguration());

            base.OnModelCreating(builder);
        }
    }
}
