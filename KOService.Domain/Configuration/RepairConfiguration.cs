using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KOService.Domain.Configuration
{
    public class RepairConfiguration : IEntityTypeConfiguration<Repair>
    {
        public void Configure(EntityTypeBuilder<Repair> builder)
        {
            builder.HasKey(r => r.Id);

            builder.HasMany(r => r.Activities)
                   .WithOne(a => a.Repair)
                   .HasForeignKey(a => a.RepairId);


            builder.Metadata.FindNavigation(nameof(Repair.Activities))
                   .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
