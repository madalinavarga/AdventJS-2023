using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class EventController: ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public EventController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }
}
