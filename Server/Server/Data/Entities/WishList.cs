namespace Server.Data.Entities
{
    public class WishList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Url { get; set; }
        public Guid UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int Order { get; set; }
        public Guid EventId { get; set; }
        public string? SiteImage { get; set; }
        public string? SiteTitle { get; set; }
        public string? SiteDescription { get; set; }

        public virtual User User { get; set; }
        public virtual Event Event { get; set; }
    }
}
