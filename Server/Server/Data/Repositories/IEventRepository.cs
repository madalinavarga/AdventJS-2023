using Server.Data.Entities;

namespace Server.Data.Repositories
{
    public interface IEventRepository
    {
        Task<Event> AddEvent(Event newEvent);
        Task<Event> Get(Guid  id);
    }
}
