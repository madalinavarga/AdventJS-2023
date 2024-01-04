using Server.Controllers.ViewModel.Invite;
using Server.Data.Entities;
using Server.Data.ViewModel;

namespace Server.Data.Repositories;
    public interface IInviteRepository
    {
        Task CreateInvitation(Invite inviteDetails);
        Task<List<Invite>> GetInvitations(Guid userId);

        Task<Invite> GetInvite(Guid userId, Guid eventId);
        Task<Invite> GetById(Guid id);

        Task Update(Invite inviteDetails);
        Task Delete(Guid eventId, Guid userId);
    }
