using Application.DTOs.Projects;

namespace Application.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectResponseDto>> GetAllAsync();
    }
}