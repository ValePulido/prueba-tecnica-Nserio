namespace Application.DTOs.Task
{
    public class TaskResponseDto
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AssigneeName { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public int EstimatedComplexity { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}