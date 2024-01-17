using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;

namespace Server.Data.Repositories;

public class WishlistRepository : IWishlistRepository
{
    private readonly ServerDbContext _serverDbContext;

    public WishlistRepository(ServerDbContext serverDbContext)
    {
        _serverDbContext = serverDbContext;
    }

    public async Task AddAsync(WishList wish)
    {
        _serverDbContext.WishList.AddAsync(wish);
        await _serverDbContext.SaveChangesAsync();
    }

    public async Task<IList<WishList>> Get(Guid userId)
    {
        return await _serverDbContext.WishList.Where(w => w.UserId == userId).ToListAsync();
    }

    public async Task DeleteAsync(Guid userId)
    {
        var wishes = await _serverDbContext.WishList.Where(w => w.UserId == userId).ToListAsync();
        if (wishes.Count > 0)
        {
            foreach (var wish in wishes) _serverDbContext.WishList.Remove(wish);
            await _serverDbContext.SaveChangesAsync();
        }
    }
}