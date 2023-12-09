using Server.Data.Entities;

namespace Server.Data.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ServerDbContext _serverDbContext;

        public EventRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext= serverDbContext;
        }

        public async Task<Event> AddEvent(Event newEvent)
        {
            var createdEvent = await _serverDbContext.Events.AddAsync(newEvent);
            _serverDbContext.SaveChanges();
            
            return createdEvent.Entity;
        }
    }
}
