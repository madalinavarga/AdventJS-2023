using AutoMapper;
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
    private readonly IMapper _mapper;

    public InviteController(ILogger<InviteController> logger, IInviteRepository inviteRepository, IEventRepository eventRepository, IUserRepository userRepository, IMapper mapper)
    {
        _logger = logger;
        _inviteRepository = inviteRepository;
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _mapper = mapper;
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

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update([FromBody] InviteUpdate invite, [FromRoute] Guid id)
    {
        var dbInvite = await _inviteRepository.GetById(id);
        if (dbInvite != null)
        {
           var updated = _mapper.Map(invite, dbInvite);
            try
            {
                await _inviteRepository.Update(updated);
            }
            catch (Exception e)
            {
                return Problem();
            }

        }
        else
        {
            return NotFound();
        }

        return Ok();
    }
}