using Server.Data.Entities;

namespace Server.Data.Repositories;
    public interface IUserRepository
    {
        Task<User?> GetByEmail(string email);
        Task AddAsync(User user);
}
