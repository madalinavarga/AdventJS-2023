using Server.Data.Entities;

namespace Server.Data.Repositories
{
    public interface IEventRepository
    {
        Task<Event> AddEvent(Event newEvent);
        Task Update(Event eventDetails);
        Task<Event> Get(Guid  id);

        Task<List<Event>>GetAll(Guid ownerId);
        Task Delete(Guid id);
    }
}
