namespace Server.Data.Models
{
    public class ThankYou
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid EventId { get; set; }
        public Guid ToUserID { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Message { get; set; }

        public virtual Users User { get; set; }
        public virtual Users ToUser { get; set; }
        public virtual Events Event { get; set; }
    }
}
