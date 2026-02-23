namespace Application.DTOs.Task
{
    public class CreateTaskDto
    {
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AssigneeId { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public int EstimatedComplexity { get; set; }
        public DateTime DueDate { get; set; }
    }
}