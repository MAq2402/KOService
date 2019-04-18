using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Configuration
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasMany(e => e.Repairs)
                   .WithOne(e => e.Manager)
                   .HasForeignKey(e => e.ManagerId);

            builder.HasMany(e => e.Activities)
                   .WithOne(a => a.Mechanic)
                   .HasForeignKey(a => a.MechanicId)
                   .IsRequired(false);
        }
    }
}
