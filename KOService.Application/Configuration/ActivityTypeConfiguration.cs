﻿using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Configuration
{
    public class ActivityTypeConfiguration : IEntityTypeConfiguration<ActivityType>
    {
        public void Configure(EntityTypeBuilder<ActivityType> builder)
        {
            builder.HasKey(at => at.Id);

            builder.HasMany(at => at.Activities)
                   .WithOne(a => a.Type)
                   .HasForeignKey(a => a.TypeId);
        }
    }
}