using Microsoft.AspNetCore.Mvc;
using Server.Controllers.ViewModel.Event;
using Server.Data.Entities;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class EventsController: ControllerBase
{
    private readonly ILogger<EventsController> _logger;
    private readonly IEventRepository _eventRepository;

    public EventsController(ILogger<EventsController> logger, IEventRepository eventRepository)
    {
        _logger = logger;
        _eventRepository = eventRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] EventRequestModel eventDetails)
    {
        var newEvent = new Event
        {
            Name = eventDetails.Name,
            Date = eventDetails.Date,
            CreatedAt = DateTime.UtcNow,
            SendReminder = eventDetails.SendReminder,
        };

        try
        {
            await _eventRepository.AddEvent(newEvent);
        }
        catch (Exception ex)
        {
            return Problem();
        }

        return Ok(newEvent);
    }
}
