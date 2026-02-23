using Domain.Entities;

namespace Domain.ServicesInterface
{
    public interface IDevelopersRepository
    {
        Task<Developers> GetByIdAsync(int id);
        Task<IEnumerable<Developers>> GetAllActiveAsync();
    }
}