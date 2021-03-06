﻿using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Configuration
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.HasKey(v => v.Id);

            builder.HasMany(v => v.Repairs)
                   .WithOne(r => r.Vehicle)
                   .HasForeignKey(r => r.VehicleId);

            builder.Metadata.FindNavigation(nameof(Vehicle.Repairs))
                            .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
