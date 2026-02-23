using Application.DTOs.Developers;
namespace Application.Interfaces
{
    public interface IDeveloperService
    {
        Task<IEnumerable<DeveloperResponseDto>> GetAllActiveAsync();
    }
}