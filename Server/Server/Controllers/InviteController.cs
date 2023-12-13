using Microsoft.AspNetCore.Mvc;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class InviteController : ControllerBase
{
    private readonly ILogger<InviteController> _logger;
    private readonly  IInviteRepository _inviteRepository;

    public InviteController(ILogger<InviteController> logger, IInviteRepository inviteRepository)
    {
        _logger= logger;
        _inviteRepository=inviteRepository;
    }

    [HttpGet()]
    public async Task<IActionResult> GetAllByEvent([FromQuery] Guid eventId)
    {

        return Ok();
    }
}