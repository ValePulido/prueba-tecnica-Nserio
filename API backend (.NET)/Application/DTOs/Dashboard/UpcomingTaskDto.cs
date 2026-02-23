namespace Application.DTOs.Dashboard
{
    public class UpcomingTaskDto
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string ProjectName { get; set; }
        public string AssigneeName { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}