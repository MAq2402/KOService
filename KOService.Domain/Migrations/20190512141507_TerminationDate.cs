using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KOService.Domain.Migrations
{
    public partial class TerminationDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "TerminationDateTime",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TerminationDateTime",
                table: "Employees");
        }
    }
}
