using Server.Data.Entities;

namespace Server.Data.Repositories;
    public interface IWishlistRepository
    {
        Task AddAsync(WishList wish);
        Task<IList<WishList>> Get(Guid userId);
        Task DeleteAsync(Guid userId);
    }
