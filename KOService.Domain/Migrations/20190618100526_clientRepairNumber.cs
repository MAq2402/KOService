using Microsoft.EntityFrameworkCore.Migrations;

namespace KOService.Domain.Migrations
{
    public partial class clientRepairNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientRepairNumber",
                table: "Pricings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientRepairNumber",
                table: "Pricings");
        }
    }
}
