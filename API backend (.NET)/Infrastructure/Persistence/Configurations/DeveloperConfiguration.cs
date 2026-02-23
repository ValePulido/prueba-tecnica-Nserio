using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class DeveloperConfiguration : IEntityTypeConfiguration<Developers>
    {
        public void Configure(EntityTypeBuilder<Developers> builder)
        {
            builder.ToTable("Developers");

            builder.HasKey(d => d.DeveloperId);

            builder.Property(d => d.FirstName)
                   .IsRequired()           
                   .HasMaxLength(100);

            builder.Property(d => d.LastName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(d => d.Email)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(d => d.IsActive)
                   .IsRequired();

            builder.Property(d => d.CreatedAt)
                   .IsRequired();
        }
    }
}