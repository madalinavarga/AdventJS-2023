using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;
using Server.Data.ViewModel;

namespace Server.Data.Repositories;
    public class InviteRepository:IInviteRepository
    {
        private readonly ServerDbContext _context;

        public InviteRepository(ServerDbContext context)
        {
            _context=context;
        }

        public Task CreateInvitation(Invite invite)
        {
            _context.Invite.AddAsync(invite);
            _context.SaveChanges();

            return Task.CompletedTask;
        }

        public async Task<List<Invite>> GetInvitations(Guid userId)
        {
            var result = await _context.Invite.Where(i => i.UserId == userId).ToListAsync();
            return result;
        }

        public async Task<Invite> GetInvite(Guid userId, Guid eventId)
        {
            var invite = await _context.Invite.FirstOrDefaultAsync(i=>i.EventId==eventId && i.UserId==userId);

            return invite;
        }
    }
