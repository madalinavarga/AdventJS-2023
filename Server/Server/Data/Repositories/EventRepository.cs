using Microsoft.EntityFrameworkCore;
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

        public  async Task Update(Event eventDetails)
        {
            _serverDbContext.Events.Update(eventDetails);
            await  _serverDbContext.SaveChangesAsync();
        }

        public Task<Event> Get(Guid id)
        {
            var foundedEvent =  _serverDbContext.Events.FirstOrDefaultAsync(e=>e.Id==id);
            return foundedEvent;
        }

        public Task<List<Event>> GetAll(Guid ownerId)
        {
            var events = _serverDbContext.Events.Where(e => e.OwnerId == ownerId).ToListAsync();
            return events;
        }
    }
}
