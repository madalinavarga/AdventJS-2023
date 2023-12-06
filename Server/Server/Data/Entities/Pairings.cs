namespace Server.Data.Entities
{
    public class Pairings
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid SantaId { get; set; }
        public Guid PersonId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual User Santa { get; set; }
        public virtual User Person { get; set; }
        public virtual Event Event { get; set; }
    }
}
