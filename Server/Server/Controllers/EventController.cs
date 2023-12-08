using Microsoft.AspNetCore.Mvc;
using Server.Controllers.ViewModel.Event;
using Server.Data.Entities;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class EventController: ControllerBase
{
    private readonly ILogger<EventController> _logger;
    private readonly IEventRepository _eventRepository;

    public EventController(ILogger<EventController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] EventRequestModel eventDetails)
    {
        var newEvent = new Event
        {
            Name = eventDetails.Name,
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
