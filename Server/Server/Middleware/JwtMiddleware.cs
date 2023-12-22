using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace Server.Middleware;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].ToString();
        var path = context.Request.Path.Value;

        if (path.Equals("/login") || path.Equals("/register"))
        {
            await _next(context);
            return;
        }

        if (!string.IsNullOrWhiteSpace(token) && token.StartsWith("Bearer "))
            try
            {
                var tokenString = token.Substring("Bearer ".Length);
                var userId= GetUserIdFromToken(tokenString);
                context.Items["UserId"] = userId;

                await _next(context);
                return;
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid token");
                return;
            }

        context.Response.StatusCode = 401;
        await context.Response.WriteAsync("Missing or invalid token");
    }

    public string GetUserIdFromToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);
        var claims = jwt.Claims;
        var userId = claims.FirstOrDefault(c =>
            c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


        return userId;
    }
}