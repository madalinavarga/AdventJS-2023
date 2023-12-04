namespace Server.Models
{
    public class UserStatus
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public Status Status { get; set; }

        public virtual Users User { get; set; }
        public virtual Events Event { get; set; }
    }
}
