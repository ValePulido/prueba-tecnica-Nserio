using Application.DTOs.Task;
using Application.Interfaces;
using Application.ServiceInterface;
using Application.Validators;
using Domain.Entities;
using Domain.Exceptions;
using Domain.ServicesInterface;

namespace Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IDevelopersRepository _developerRepository;

        public TaskService(ITaskRepository taskRepository, IProjectRepository projectRepository, IDevelopersRepository developerRepository)
        {
            _taskRepository = taskRepository;
            _projectRepository = projectRepository;
            _developerRepository = developerRepository;
        }

        public async Task<TaskResponseDto> CreateAsync(CreateTaskDto dto)
        {
            var errors = CreateTaskValidator.Validate(dto);
            if (errors.Any())
                throw new DomainException(string.Join(" | ", errors));

            var project = await _projectRepository.GetByIdAsync(dto.ProjectId);
            if (project == null)
                throw new NotFoundException("Project", dto.ProjectId);

            var developer = await _developerRepository.GetByIdAsync(dto.AssigneeId);
            if (developer == null)
                throw new NotFoundException("Developer", dto.AssigneeId);

            var task = new Tasks
            {
                ProjectId = dto.ProjectId,
                Title = dto.Title,
                Description = dto.Description,
                AssigneeId = dto.AssigneeId,
                Status = dto.Status,
                Priority = dto.Priority,
                EstimatedComplexity = dto.EstimatedComplexity,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.Now
            };

            await _taskRepository.AddAsync(task);

            return new TaskResponseDto
            {
                TaskId = task.TaskId,
                Title = task.Title,
                Description = task.Description,
                AssigneeName = $"{developer.FirstName} {developer.LastName}",
                Status = task.Status,
                Priority = task.Priority,
                EstimatedComplexity = task.EstimatedComplexity,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt
            };
        }

        public async Task<IEnumerable<TaskResponseDto>> GetByProjectAsync(
            int projectId, int page, int pageSize, string? status, int? assigneeId)
        {
            var tasks = await _taskRepository.GetByProjectAsync(projectId, page, pageSize, status, assigneeId);

            return tasks.Select(t => new TaskResponseDto
            {
                TaskId = t.TaskId,
                Title = t.Title,
                Description = t.Description,
                AssigneeName = $"{t.Assignee.FirstName} {t.Assignee.LastName}",
                Status = t.Status,
                Priority = t.Priority,
                EstimatedComplexity = t.EstimatedComplexity,
                DueDate = t.DueDate,
                CompletionDate = t.CompletionDate,
                CreatedAt = t.CreatedAt
            });
        }
    }
}