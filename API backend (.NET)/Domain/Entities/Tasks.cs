namespace Domain.Entities
{
    public class Tasks
    {
        public int TaskId { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AssigneeId { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public int EstimatedComplexity { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public Projects Project { get; set; } 
        public Developers Assignee { get; set; }
    }
}