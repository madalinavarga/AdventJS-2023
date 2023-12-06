using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetUsers")]
    public IEnumerable<String> Get()
    {
        return null;
    }
}
