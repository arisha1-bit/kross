using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shatrashanova_lab1_kross.Migrations
{
    /// <inheritdoc />
    public partial class add_calories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "Exercise",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Exercise");
        }
    }
}
