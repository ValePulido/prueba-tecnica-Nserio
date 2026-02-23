namespace Domain.Entities
{
    public class Developers
    {
        public int DeveloperId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
    }
}