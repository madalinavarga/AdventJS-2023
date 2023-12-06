using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class EventController: ControllerBase
{
    private readonly ILogger<EventController> _logger;

    public EventController(ILogger<EventController> logger)
    {
        _logger = logger;
    }
}
