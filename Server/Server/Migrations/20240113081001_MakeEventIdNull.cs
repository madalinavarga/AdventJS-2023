using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class MakeEventIdNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishList_Events_EventId",
                table: "WishList");

            migrationBuilder.DropIndex(
                name: "IX_WishList_EventId",
                table: "WishList");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "WishList");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "WishList");

            migrationBuilder.DropColumn(
                name: "SiteDescription",
                table: "WishList");

            migrationBuilder.DropColumn(
                name: "SiteImage",
                table: "WishList");

            migrationBuilder.DropColumn(
                name: "SiteTitle",
                table: "WishList");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EventId",
                table: "WishList",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "WishList",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SiteDescription",
                table: "WishList",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SiteImage",
                table: "WishList",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SiteTitle",
                table: "WishList",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WishList_EventId",
                table: "WishList",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishList_Events_EventId",
                table: "WishList",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
