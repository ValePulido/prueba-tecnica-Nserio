using Application.DTOs.Dashboard;

namespace Application.Interfaces
{
    public interface IDashboardService
    {
        Task<IEnumerable<DeveloperLoadSummaryDto>> GetDeveloperWorkloadAsync();
        Task<IEnumerable<ProjectStatusSummaryDto>> GetProjectHealthAsync();
        Task<IEnumerable<DeveloperDelayRiskDto>> GetDeveloperDelayRiskAsync();
    }
}