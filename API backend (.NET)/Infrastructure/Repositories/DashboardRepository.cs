using Application.DTOs.Dashboard;
using Application.Interfaces;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DeveloperLoadSummaryDto>> GetDeveloperWorkloadAsync()
        {
            return await _context.DeveloperWorkloads
                .FromSqlRaw("EXEC GetLoadSummaryByDeveloper")
                .ToListAsync();
        }

        public async Task<IEnumerable<ProjectStatusSummaryDto>> GetProjectStatusAsync()
        {
            return await _context.ProjectStatusSummaries
                .FromSqlRaw("EXEC GetProjectStatusSummary")
                .ToListAsync();
        }

        public async Task<IEnumerable<UpcomingTaskDto>> GetUpcomingTasksAsync()
        {
            return await _context.UpcomingTasks
                .FromSqlRaw("EXEC GetUpcomingTasksDue")
                .ToListAsync();
        }

        public async Task<IEnumerable<DeveloperDelayRiskDto>> GetDeveloperDelayRiskAsync()
        {
            return await _context.DeveloperDelayRisks
                .FromSqlRaw("EXEC DeveloperDelayRiskPrediction")
                .ToListAsync();
        }
    }
}