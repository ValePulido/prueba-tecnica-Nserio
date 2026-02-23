using Application.DTOs.Task;

namespace Application.Validators
{
    public static class CreateTaskValidator
    {
        private static readonly string[] ValidStatuses = { "ToDo", "InProgress", "Blocked", "Completed" };
        private static readonly string[] ValidPriorities = { "Low", "Medium", "High" };

        public static List<string> Validate(CreateTaskDto dto)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(dto.Title))
                errors.Add("El título es obligatorio.");

            if (string.IsNullOrWhiteSpace(dto.Description))
                errors.Add("La descripción es obligatoria.");

            if (dto.ProjectId <= 0)
                errors.Add("ProjectId debe ser un número mayor a 0.");

            if (dto.AssigneeId <= 0)
                errors.Add("AssigneeId debe ser un número mayor a 0.");

            if (string.IsNullOrWhiteSpace(dto.Status))
                errors.Add("El estado es obligatorio.");
            else if (!ValidStatuses.Contains(dto.Status))
                errors.Add($"Status inválido: '{dto.Status}'. Valores permitidos: {string.Join(", ", ValidStatuses)}");

            if (string.IsNullOrWhiteSpace(dto.Priority))
                errors.Add("La prioridad es obligatoria.");
            else if (!ValidPriorities.Contains(dto.Priority))
                errors.Add($"Priority inválido: '{dto.Priority}'. Valores permitidos: {string.Join(", ", ValidPriorities)}");

            if (dto.EstimatedComplexity < 1 || dto.EstimatedComplexity > 5)
                errors.Add("EstimatedComplexity debe ser entre 1 y 5.");

            if (dto.DueDate == default)
                errors.Add("La fecha de vencimiento es obligatoria.");
            else if (dto.DueDate <= DateTime.Now)
                errors.Add("La fecha de vencimiento debe ser mayor a la fecha actual.");

            return errors;
        }
    }
}