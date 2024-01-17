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

        public virtual User User { get; set; }
    }
}
