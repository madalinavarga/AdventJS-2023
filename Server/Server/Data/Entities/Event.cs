namespace Server.Data.Entities
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool? SendReminder { get; set; }
    }
}
