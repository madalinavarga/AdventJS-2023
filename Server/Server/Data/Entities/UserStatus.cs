namespace Server.Data.Entities
{
    public class UserStatus
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public Status? Status { get; set; } = Data.Status.Invited;

        public virtual User User { get; set; }
        public virtual Event Event { get; set; }
    }
}
