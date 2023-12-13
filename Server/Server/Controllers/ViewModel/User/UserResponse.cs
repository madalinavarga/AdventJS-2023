using Server.Data;

namespace Server.Controllers.ViewModel.User;

public class UserResponse
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Avatar { get; set; }
    public Role Role { get; set; }
}