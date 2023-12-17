using Microsoft.AspNetCore.Mvc;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;


    public UsersController(ILogger<UsersController> logger, IEventRepository eventRepository, IUserRepository userRepository)
    {
        _logger = logger;
        _eventRepository = eventRepository;
        _userRepository = userRepository;
    }
    
    [HttpGet(Name = "GetUsers")]
    public IEnumerable<String> Get()
    {
        return null;
    }
}
