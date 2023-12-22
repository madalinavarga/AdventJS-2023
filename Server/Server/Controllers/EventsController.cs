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
    private readonly IUserRepository _userRepository;
    protected string _userId;  //need to fix and test

    public EventsController(ILogger<EventsController> logger, IEventRepository eventRepository, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
    {
        _logger = logger;
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _userId = httpContextAccessor.HttpContext.Items["UserId"]?.ToString();
    }

    [HttpGet("{id}")]

    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        try
        {
            var foundedEvent= await _eventRepository.Get(id);
            if (foundedEvent == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(foundedEvent);
            }
        }
        catch (Exception ex)
        {
            return Problem();
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] EventRequestModel eventDetails)
    {
        //TODO add owner
        var newEvent = new Event
        {
            Name = eventDetails.Name,
            Date = eventDetails.Date,
            CreatedAt = DateTime.UtcNow,
            SendReminder = eventDetails.SendReminder,
            OwnerId = Guid.Parse(_userId)
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

    [HttpGet("{eventId}/users")]
    public async Task<IActionResult> GetAllByEvent([FromRoute] Guid eventId)
    {
        var eventDb = await _eventRepository.Get(eventId);

        if (eventDb != null)
        {
            var users = await _userRepository.GetUsersByEventId(eventId);
            return Ok(users);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet()]
    public async Task<IActionResult> GetAllByOwner([FromQuery] Guid? ownerId)
    {
        var owner = Guid.Parse(_userId);

        if (ownerId != null)
        {
            owner = (Guid)ownerId;
        }

        var result = await _eventRepository.GetAll(owner);

        return Ok(result);
    }
}
