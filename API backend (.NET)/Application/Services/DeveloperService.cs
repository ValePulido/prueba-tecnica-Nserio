using Application.DTOs.Developers;
using Application.Interfaces;
using Domain.ServicesInterface;

namespace Application.Services
{
    public class DeveloperService : IDeveloperService
    {
        private readonly IDevelopersRepository _developerRepository;

        public DeveloperService(IDevelopersRepository developerRepository)
        {
            _developerRepository = developerRepository;
        }

        public async Task<IEnumerable<DeveloperResponseDto>> GetAllActiveAsync()
        {
            var developers = await _developerRepository.GetAllActiveAsync();

            return developers.Select(d => new DeveloperResponseDto
            {
                DeveloperId = d.DeveloperId,
                FullName = $"{d.FirstName} {d.LastName}",
                Email = d.Email
            });
        }
    }
}