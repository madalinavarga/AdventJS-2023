using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;
using Server.Data.ViewModel.UserResponse;

namespace Server.Data.Repositories;
    public class InviteRepository:IInviteRepository
    {
        private readonly ServerDbContext _context;

        public InviteRepository(ServerDbContext context)
        {
            _context=context;
        }

        public async Task<IList<UserResponse>> GetUsersByEventId(Guid eventId)
        {
            var users = await _context.Invite.Where(i=> i.EventId==eventId)
                                    .Join(_context.Users,
                                     invite=>invite.UserId,
                                     user=>user.Id,
                                     (invite, user) => new UserResponse
                                     {
                                         Id = user.Id,
                                         FirstName = user.FirstName,
                                         LastName = user.LastName,
                                         Email = user.Email,
                                         Avatar = user.Avatar,
                                         Role = user.Role,
                                     }
                                     ). Distinct().ToListAsync();

            return users;
        }
    }
