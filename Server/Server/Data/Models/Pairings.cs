namespace Server.Data.Models
{
    public class Pairings
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid SantaId { get; set; }
        public Guid PersonId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public virtual Users Santa { get; set; }
        public virtual Users Person { get; set; }
        public virtual Events Event { get; set; }
    }
}
