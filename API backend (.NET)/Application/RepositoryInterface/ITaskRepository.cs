using Domain.Entities;

namespace Application.ServiceInterface
{
    public interface ITaskRepository
    {
        Task<Tasks> GetByIdAsync(int id);
        Task<IEnumerable<Tasks>> GetByProjectAsync(
            int projectId, int page, int pageSize, string? status, int? assigneeId);
        Task AddAsync(Tasks task); 
        Task UpdateAsync(Tasks task);
    }
}