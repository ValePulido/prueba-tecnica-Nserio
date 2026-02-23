using Domain.Entities;
using Domain.ServicesInterface;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class DeveloperRepository : IDevelopersRepository
    {
        private readonly AppDbContext _context;

        public DeveloperRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Developers> GetByIdAsync(int id)
        {
            return await _context.Developers
                .FirstOrDefaultAsync(d => d.DeveloperId == id);
        }

        public async Task<IEnumerable<Developers>> GetAllActiveAsync()
        {
            return await _context.Developers
                .Where(d => d.IsActive == true)
                .ToListAsync();
        }
    }
}