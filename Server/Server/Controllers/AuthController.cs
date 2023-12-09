using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Controllers.ViewModel.Auth;
using Server.Data.Entities;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IUserRepository _usersRepository;

    public AuthController(ILogger<AuthController> logger, IUserRepository usersRepository)
    {
        _logger = logger;
        _usersRepository = usersRepository;
    }

    [HttpPost("/login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel loginModel)
    {
        User user = await _usersRepository.GetByEmail(loginModel.Email);

        if (user != null)
        {
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password);

            if (!isValidPassword)
            {
                return BadRequest();
            }

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        return NotFound();
    }

    [HttpPost("/register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel registerModel)
    {
        var user = await _usersRepository.GetByEmail(registerModel.Email);

        if (user != null) return Conflict();

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerModel.Password);

        var mappedUser = new User
        {
            Email = registerModel.Email,
            FirstName = registerModel.FirstName,
            LastName = registerModel.LastName,
            Password = passwordHash,
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            await _usersRepository.AddAsync(mappedUser);
        }
        catch (Exception ex)
        {
            _logger.LogError("{method} failed.Account creation failed. Errors: {err}",
                nameof(_usersRepository.AddAsync), ex);
            return Problem();
        }

        return Ok();
    }

    public static string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
        };

        SecurityKey securityKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fb102217-6494-48e2-9d32-b3c068020a87"));

        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256),
            expires: DateTime.UtcNow.AddHours(12)
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}