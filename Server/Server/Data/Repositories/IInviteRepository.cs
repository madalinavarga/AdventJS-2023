using Server.Data.Entities;

namespace Server.Data.Repositories;
    public interface IInviteRepository
    {
        Task CreateInvitation(Invite inviteDetails);
    }
