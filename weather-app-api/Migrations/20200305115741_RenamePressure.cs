using Microsoft.EntityFrameworkCore.Migrations;

namespace weather_app_api.Migrations
{
    public partial class RenamePressure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Value",
                table: "Temperatures");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "Pressures");

            migrationBuilder.AddColumn<double>(
                name: "MeasuredValue",
                table: "Temperatures",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MeasuredValue",
                table: "Pressures",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeasuredValue",
                table: "Temperatures");

            migrationBuilder.DropColumn(
                name: "MeasuredValue",
                table: "Pressures");

            migrationBuilder.AddColumn<double>(
                name: "Value",
                table: "Temperatures",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Value",
                table: "Pressures",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
