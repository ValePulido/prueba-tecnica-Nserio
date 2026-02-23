using Application.DTOs.Projects;
using Application.Interfaces;
using Domain.ServicesInterface;

namespace Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<ProjectResponseDto>> GetAllAsync()
        {
            var projects = await _projectRepository.GetAllAsync();

            return projects.Select(p => new ProjectResponseDto
            {
                ProjectId = p.ProjectId,
                Name = p.Name,
                ClientName = p.ClientName,
                Status = p.Status,
                TotalTasks = p.Tasks.Count,
                OpenTasks = p.Tasks.Count(t => t.Status != "Completed"),
                CompletedTasks = p.Tasks.Count(t => t.Status == "Completed")
            });
        }
    }
}