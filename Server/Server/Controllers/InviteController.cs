using Microsoft.AspNetCore.Mvc;
using Server.Controllers.ViewModel.Invite;
using Server.Data;
using Server.Data.Entities;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class InviteController : ControllerBase
{
    private readonly ILogger<InviteController> _logger;
    private readonly  IInviteRepository _inviteRepository;
    private readonly IEventRepository _eventRepository;
    private readonly  IUserRepository _userRepository;

    public InviteController(ILogger<InviteController> logger, IInviteRepository inviteRepository, IEventRepository eventRepository, IUserRepository userRepository)
    {
        _logger= logger;
        _inviteRepository=inviteRepository;
        _eventRepository=eventRepository;
        _userRepository=userRepository;
    }

    [HttpPost()]
    public async Task<IActionResult> Create([FromBody] InviteRequest inviteDetails)
    {
        var checkedEvent = await _eventRepository.Get(inviteDetails.EventId);
        var user = await _userRepository.GetByEmail(inviteDetails.Email);
        if (checkedEvent != null && user != null)
        {
            var invite = new Invite
            {
                EventId = inviteDetails.EventId,
                UserId = user.Id,
                Status = Status.Invited
            };

            await _inviteRepository.CreateInvitation(invite);
            return Ok();
        }
        else
        {
            return NotFound();
        }
    }
}