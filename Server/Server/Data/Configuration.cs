using Microsoft.EntityFrameworkCore;
using Server.Data.Repositories;

namespace Server.Data
{
    public static class Configuration
    {
        public static void AddDb(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ServerDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEventRepository, EventRepository>();   
            services.AddScoped<IInviteRepository, InviteRepository>();
        }
    }
}
