using Server.Data.Entities;
using Server.Data.ViewModel.UserResponse;

namespace Server.Data.Repositories;
    public interface IInviteRepository
    {
        Task<IList<UserResponse>> GetUsersByEventId(Guid eventId);
    }
