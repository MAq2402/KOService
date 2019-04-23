using KOService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Configuration
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {

            builder.HasKey(c => c.Id);

            builder.HasOne(c => c.Address)
                   .WithOne(a => a.Client)
                   .HasForeignKey<Client>(c => c.AddressId);

            builder.HasMany(c => c.Vehicles)
                   .WithOne(v => v.Client)
                   .HasForeignKey(v => v.ClientId);

            builder.Metadata.FindNavigation(nameof(Client.Vehicles))
                    .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
