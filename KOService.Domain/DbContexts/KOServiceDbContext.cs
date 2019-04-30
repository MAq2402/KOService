using KOService.Domain.Authentication;
using KOService.Domain.Configuration;
using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace KOService.Domain.DbContexts
{
    public class KOServiceDbContext: IdentityDbContext
    {
        public KOServiceDbContext(DbContextOptions<KOServiceDbContext> dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<Repair> Repairs { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ClientConfiguration());
            builder.ApplyConfiguration(new EmployeeConfiguration());
            builder.ApplyConfiguration(new VehicleConfiguration());
            builder.ApplyConfiguration(new VehicleTypeConfiguration());
            builder.ApplyConfiguration(new RepairConfiguration());
            builder.ApplyConfiguration(new ActivityConfiguration());

            base.OnModelCreating(builder);
        }
    }
}
