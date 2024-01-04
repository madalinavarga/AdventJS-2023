using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;

namespace Server.Data.Repositories;

public class InviteRepository : IInviteRepository
{
    private readonly ServerDbContext _context;

    public InviteRepository(ServerDbContext context)
    {
        _context = context;
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
        var invite = await _context.Invite.FirstOrDefaultAsync(i => i.EventId == eventId && i.UserId == userId);

        return invite;
    }

    public async Task<Invite> GetById(Guid id)
    {
        var invite = await _context.Invite.FirstOrDefaultAsync(i => i.Id == id);

        return invite;
    }

    public async Task Update(Invite inviteDetails)
    {
        var result = _context.Invite.Update(inviteDetails);
        await _context.SaveChangesAsync();
    }

    public async  Task Delete(Guid eventId, Guid userId)
    {
        var invite = await _context.Invite.FirstOrDefaultAsync(invite => invite.EventId == eventId && invite.UserId == userId);

        if (invite != null)
        {
            _context.Remove(invite);
            _context.SaveChanges();
        }
    }
}