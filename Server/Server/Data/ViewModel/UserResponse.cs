using Server.Data;

namespace Server.Data.ViewModel.UserResponse;

public class UserResponse
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Avatar { get; set; }

    public Status Status { get; set; }
    public Role Role { get; set; }
}