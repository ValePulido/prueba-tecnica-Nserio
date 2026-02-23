using Application.DTOs.Dashboard;

namespace Application.Interfaces
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<DeveloperLoadSummaryDto>> GetDeveloperWorkloadAsync();
        Task<IEnumerable<ProjectStatusSummaryDto>> GetProjectStatusAsync();
        Task<IEnumerable<UpcomingTaskDto>> GetUpcomingTasksAsync();
        Task<IEnumerable<DeveloperDelayRiskDto>> GetDeveloperDelayRiskAsync();
    }
}