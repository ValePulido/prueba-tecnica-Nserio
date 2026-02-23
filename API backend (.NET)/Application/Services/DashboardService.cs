using Application.DTOs.Dashboard;
using Application.Interfaces;

namespace Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<IEnumerable<DeveloperLoadSummaryDto>> GetDeveloperWorkloadAsync()
        {
            return await _dashboardRepository.GetDeveloperWorkloadAsync();
        }

        public async Task<IEnumerable<ProjectStatusSummaryDto>> GetProjectHealthAsync()
        {
            return await _dashboardRepository.GetProjectStatusAsync();
        }

        public async Task<IEnumerable<DeveloperDelayRiskDto>> GetDeveloperDelayRiskAsync()
        {
            return await _dashboardRepository.GetDeveloperDelayRiskAsync();
        }
    }
}