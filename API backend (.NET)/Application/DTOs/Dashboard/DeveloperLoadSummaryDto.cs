namespace Application.DTOs.Dashboard
{
    public class DeveloperLoadSummaryDto
    {
        public int DeveloperId { get; set; }
        public string DeveloperName { get; set; }
        public int OpenTasksCount { get; set; }
        public decimal? AverageEstimatedComplexity { get; set; }
    }
}