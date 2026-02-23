using Domain.Entities;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Application.ServiceInterface;

namespace Infrastructure.Persistence.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Tasks> GetByIdAsync(int id)
        {
            return await _context.Tasks
                .Include(t => t.Project)
                .Include(t => t.Assignee)
                .FirstOrDefaultAsync(t => t.TaskId == id);
        }

        public async Task<IEnumerable<Tasks>> GetByProjectAsync(
            int projectId, int page, int pageSize, string? status, int? assigneeId)
        {
            var query = _context.Tasks
                .Include(t => t.Assignee)
                .Where(t => t.ProjectId == projectId);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            if (assigneeId.HasValue)
                query = query.Where(t => t.AssigneeId == assigneeId.Value);

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task AddAsync(Tasks task)
        {
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC InsertNewTask @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7",
                task.ProjectId,
                task.Title,
                task.Description,
                task.AssigneeId,
                task.Status,
                task.Priority,
                task.EstimatedComplexity,
                task.DueDate);
        }

        public async Task UpdateAsync(Tasks task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }
    }
}