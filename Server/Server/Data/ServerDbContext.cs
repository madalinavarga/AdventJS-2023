﻿using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;

namespace Server.Data;

public class ServerDbContext : DbContext
{
    public ServerDbContext(DbContextOptions<ServerDbContext> options) : base(options)
    {
    }

    public DbSet<Invite> Invite { get; set; }

    public DbSet<User> Users { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Pairings> Pairings { get; set; }
    public DbSet<ThankYou> ThankYou { get; set; }
    public DbSet<WishList> WishList { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Invite>()
            .HasOne(u => u.User)
            .WithMany()
            .HasForeignKey(e => e.UserId);

        modelBuilder.Entity<Invite>()
            .HasOne(u => u.Event)
            .WithMany()
            .HasForeignKey(e => e.EventId);


        modelBuilder.Entity<Pairings>()
            .HasOne(u => u.Event)
            .WithMany()
            .HasForeignKey(e => e.EventId);

        modelBuilder.Entity<Pairings>()
            .HasOne(u => u.Person)
            .WithMany()
            .HasForeignKey(e => e.PersonId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Pairings>()
            .HasOne(u => u.Santa)
            .WithMany()
            .HasForeignKey(e => e.SantaId)
            .OnDelete(DeleteBehavior.NoAction);


        modelBuilder.Entity<ThankYou>()
            .HasOne(u => u.Event)
            .WithMany()
            .HasForeignKey(e => e.EventId);

        modelBuilder.Entity<ThankYou>()
            .HasOne(u => u.ToUser)
            .WithMany()
            .HasForeignKey(e => e.ToUserID)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ThankYou>()
            .HasOne(u => u.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<WishList>()
            .HasOne(u => u.User)
            .WithMany()
            .HasForeignKey(e => e.UserId);
    }
}