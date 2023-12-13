namespace Server.Controllers.ViewModel.Invite;
    public class InviteRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Guid EventId { get; set; }
    }
