using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Configuration
{
    public class VehicleTypeConfiguration : IEntityTypeConfiguration<VehicleType>
    {
        public void Configure(EntityTypeBuilder<VehicleType> builder)
        {
            builder.HasKey(vt => vt.Id);

            builder.HasMany(vt => vt.Vehicles)
                   .WithOne(v => v.Type)
                   .HasForeignKey(v => v.TypeId);
        }
    }
}
