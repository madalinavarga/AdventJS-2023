namespace Server.Data.Entities
{
    public class ThankYou
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid EventId { get; set; }
        public Guid ToUserID { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string Message { get; set; }

        public virtual User User { get; set; }
        public virtual User ToUser { get; set; }
        public virtual Event Event { get; set; }
    }
}
