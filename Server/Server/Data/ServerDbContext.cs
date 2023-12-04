using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class ServerDbContext : DbContext
{
    public ServerDbContext(DbContextOptions<ServerDbContext> options) : base(options)
    {
    }

    //public DbSet<UserStatus> UserStatus { get; set; }

    //public DbSet<Users> Users { get; set; }

    //public DbSet<Events> Events { get; set; }

    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    base.OnModelCreating(modelBuilder);

    //    modelBuilder.Entity<UserStatus>()
    //        .HasOne(u => u.User)
    //        .WithMany()
    //        .HasForeignKey(e => e.UserId);

    //    modelBuilder.Entity<UserStatus>()
    //        .HasOne(u => u.Event)
    //        .WithMany()
    //        .HasForeignKey(e => e.EventId);
    //}
}