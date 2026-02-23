using Application.DTOs.Common;
using Application.DTOs.Dashboard;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Developers> Developers { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<DeveloperLoadSummaryDto> DeveloperWorkloads { get; set; }
        public DbSet<ProjectStatusSummaryDto> ProjectStatusSummaries { get; set; }
        public DbSet<UpcomingTaskDto> UpcomingTasks { get; set; }
        public DbSet<DeveloperDelayRiskDto> DeveloperDelayRisks { get; set; }
        public DbSet<OperationResultDto> OperationResults { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            modelBuilder.Entity<DeveloperLoadSummaryDto>().HasNoKey();
            modelBuilder.Entity<ProjectStatusSummaryDto>().HasNoKey();
            modelBuilder.Entity<UpcomingTaskDto>().HasNoKey();
            modelBuilder.Entity<DeveloperDelayRiskDto>().HasNoKey();
            modelBuilder.Entity<OperationResultDto>().HasNoKey();
        }
    }
}