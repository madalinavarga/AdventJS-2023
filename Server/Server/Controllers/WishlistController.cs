using Microsoft.AspNetCore.Mvc;
using Server.Controllers.ViewModel.Wishlist;
using Server.Data.Entities;
using Server.Data.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WishlistController : ControllerBase
{
    private readonly IWishlistRepository _wishlistRepository;
    protected string userId => HttpContext.Items["UserId"]?.ToString();

    public WishlistController(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] IList<WishlistCreate> wishes)
    {

        if (wishes.Count > 5)
        {
            return Problem("To many items");
        }

        try
        {
            await _wishlistRepository.DeleteAsync(Guid.Parse(userId));

            foreach (var wish in wishes)
            {
                var wishEntity = new WishList
                {
                    Id = Guid.NewGuid(),
                    Name = wish.Name,
                    UserId = Guid.Parse(userId),
                    Url = wish.Url,
                    CreatedAt = DateTime.UtcNow
                };

                await _wishlistRepository.AddAsync(wishEntity);

            }
        }
        catch (Exception ex)
        {
            return Problem();
        }

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] Guid? id)
    {
        var userGuid = Guid.Parse(userId);

        if (id != null)
        {
            userGuid = (Guid)id;
        }

        try
        {
            return Ok( await _wishlistRepository.Get(userGuid));
        }
        catch (Exception ex)
        {
            
            return Problem();
        }
    }
}