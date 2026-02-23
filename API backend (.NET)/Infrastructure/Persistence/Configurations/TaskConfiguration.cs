using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class TaskConfiguration : IEntityTypeConfiguration<Tasks>
    {
        public void Configure(EntityTypeBuilder<Tasks> builder)
        {
            builder.ToTable("Tasks");

            builder.HasKey(t => t.TaskId);

            builder.Property(t => t.ProjectId)
                   .IsRequired();

            builder.Property(t => t.Title)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.Description)
                   .IsRequired()
                   .HasMaxLength(300);

            builder.Property(t => t.AssigneeId)
                   .IsRequired();

            builder.Property(t => t.Status) 
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.Priority)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.EstimatedComplexity)
                   .IsRequired();

            builder.Property(t => t.DueDate)
                   .IsRequired();

            builder.Property(t => t.CompletionDate); 


            builder.Property(t => t.CreatedAt)
                   .IsRequired();

            builder.HasOne(t => t.Project)
                   .WithMany(p => p.Tasks)
                   .HasForeignKey(t => t.ProjectId);

            builder.HasOne(t => t.Assignee)
                   .WithMany(d => d.Tasks)
                   .HasForeignKey(t => t.AssigneeId);
        }
    }
}