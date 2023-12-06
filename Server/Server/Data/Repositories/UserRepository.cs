using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;

namespace Server.Data.Repositories;
    public class UserRepository :IUserRepository
    {
        private readonly ServerDbContext _serverDbContext;

        public UserRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }

        public Task<User?> GetByEmail(string email)
        {
            return _serverDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

        public Task AddAsync(User user)
        {
            _serverDbContext.Users.AddAsync(user);
            _serverDbContext.SaveChanges();
            return Task.CompletedTask;
        }
    }
