using Server.Data;

namespace Server.Controllers.ViewModel.Invite;
    public class InviteUpdate
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public Guid? EventId { get; set; }

        public Status? Status { get; set; }

}
