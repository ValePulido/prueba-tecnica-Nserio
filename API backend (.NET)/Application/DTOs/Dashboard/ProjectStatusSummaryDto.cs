namespace Application.DTOs.Dashboard
{
    public class ProjectStatusSummaryDto
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int TotalTasks { get; set; }
        public int OpenTasks { get; set; }
        public int CompletedTasks { get; set; }
    }
}