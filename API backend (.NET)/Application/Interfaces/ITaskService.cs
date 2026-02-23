using Application.DTOs.Task;

namespace Application.Interfaces
{
    public interface ITaskService
    {
        Task<TaskResponseDto> CreateAsync(CreateTaskDto createTaskDto);
        Task<IEnumerable<TaskResponseDto>> GetByProjectAsync(int projectId, int page, int pageSize, string? status, int? assigneeId);
    }
}