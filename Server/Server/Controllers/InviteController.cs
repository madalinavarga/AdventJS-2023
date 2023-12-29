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
    protected string userId => HttpContext.Items["UserId"]?.ToString();

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
            var existingInvite = await _inviteRepository.GetInvite(user.Id, checkedEvent.Id);

            if (existingInvite != null)
            {
                return Conflict();
            }

            var invite = new Invite
            {
                EventId = inviteDetails.EventId,
                UserId = user.Id,
                Status = Status.Invited,
                Name = inviteDetails.Name,
            };
            try
            {
                await _inviteRepository.CreateInvitation(invite);
            }
            catch (Exception ex)
            {
                return Problem();
            }

            return Ok();
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var invitations = await _inviteRepository.GetInvitations(Guid.Parse(userId));
        return Ok(invitations);
    }
}