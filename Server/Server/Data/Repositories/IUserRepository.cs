using Server.Data.Entities;
using Server.Data.ViewModel.UserResponse;

namespace Server.Data.Repositories;
    public interface IUserRepository
    {
        Task<User?> GetByEmail(string email);
        Task AddAsync(User user);
        Task<IList<UserResponse>> GetUsersByEventId(Guid eventId);
}
