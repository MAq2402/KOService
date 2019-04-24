using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KOService.Domain.Migrations
{
    public partial class ClientRefactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Addresses_AddressId",
                table: "Clients");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Clients_AddressId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Clients",
                newName: "ContactDetails_Email");

            migrationBuilder.RenameColumn(
                name: "ContactNumber",
                table: "Clients",
                newName: "ContactDetails_PhoneNumber");

            migrationBuilder.AddColumn<string>(
                name: "Address_City",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Code",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Street",
                table: "Clients",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_City",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Address_Code",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Address_Street",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "ContactDetails_Email",
                table: "Clients",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "ContactDetails_PhoneNumber",
                table: "Clients",
                newName: "ContactNumber");

            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "Clients",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_AddressId",
                table: "Clients",
                column: "AddressId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Addresses_AddressId",
                table: "Clients",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
