namespace Domain.Entities
{
    public class Projects
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string ClientName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
    }
}