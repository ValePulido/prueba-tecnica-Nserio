using Domain.Entities;

namespace Domain.ServicesInterface
{
    public interface IProjectRepository
    {
        Task<Projects> GetByIdAsync(int id);
        Task<IEnumerable<Projects>> GetAllAsync();
    }
}