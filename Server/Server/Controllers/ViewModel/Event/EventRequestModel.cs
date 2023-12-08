namespace Server.Controllers.ViewModel.Event
{
    public class EventRequestModel
    {
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool SendReminder { get; set; }
    }
}
