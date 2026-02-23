using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Projects>
    {
        public void Configure(EntityTypeBuilder<Projects> builder)
        {
            builder.ToTable("Projects");

            builder.HasKey(p => p.ProjectId);

            builder.Property(p => p.Name)
                  .HasMaxLength(100);

            builder.Property(p => p.ClientName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.StartDate)
                   .IsRequired();

            builder.Property(p => p.EndDate)
                   .IsRequired();

            builder.Property(p => p.Status)
                   .IsRequired();
        }
    } 
}