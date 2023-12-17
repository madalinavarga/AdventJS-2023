using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;
using Server.Data.ViewModel.UserResponse;

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

        public async Task<IList<UserResponse>> GetUsersByEventId(Guid eventId)
        {
            // need to add the state 
            var users = await _serverDbContext.Invite.Where(i => i.EventId == eventId)
                .Join(_serverDbContext.Users,
                    invite => invite.UserId,
                    user => user.Id,
                    (invite, user) => new UserResponse
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Avatar = user.Avatar,
                        Role = user.Role,
                        Status = invite.Status
                    }
                ).Distinct().ToListAsync();

            return users;
        }
}
