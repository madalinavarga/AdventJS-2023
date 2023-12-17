using Server.Data.Entities;

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
    }
