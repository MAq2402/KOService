using KOService.Domain.Entities;
using KOService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

using System.Text;

namespace KOService.Domain.Configuration
{
    public class PricingConfiguration : IEntityTypeConfiguration<Pricing>
    {
        public void Configure(EntityTypeBuilder<Pricing> builder)
        {
            builder.HasKey(p => p.Id);
            builder.HasMany(p => p.Parts)
                   .WithOne(prt => prt.Pricing)
                   .HasForeignKey(prt => prt.PricingId);
           
        }
    }
}