namespace Server.Middleware;
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next=next;
        }

    public async Task Invoke(HttpContext context)
    {
        string token = context.Request.Headers["Authorization"].ToString();
        var path = context.Request.Path.Value;

        if (path.Equals("/login") || path.Equals("/register"))
        {
            await _next(context);
            return;
        }

        if (!string.IsNullOrWhiteSpace(token) && token.StartsWith("Bearer "))
        {
            try
            {
                var tokenString = token.Substring("Bearer ".Length);

                await _next(context);
                return;
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 401; 
                await context.Response.WriteAsync("Invalid token");
                return;
            }
        }

        context.Response.StatusCode = 401; 
        await context.Response.WriteAsync("Missing or invalid token");
    }
    }
