using Server.Data;

namespace Server.Controllers.ViewModel.Invite
{
    public class InviteCreation
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public Status? Status { get; set; } = Data.Status.Invited;
    }
}
