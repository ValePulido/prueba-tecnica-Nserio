namespace Application.DTOs.Projects
{
    public class ProjectResponseDto
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string ClientName { get; set; }
        public string Status { get; set; }
        public int TotalTasks { get; set; }
        public int OpenTasks { get; set; }
        public int CompletedTasks { get; set; }
    }
}