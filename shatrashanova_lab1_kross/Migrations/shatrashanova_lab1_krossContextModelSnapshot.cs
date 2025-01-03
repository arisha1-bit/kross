﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using shatrashanova_lab1_kross.Data;

#nullable disable

namespace shatrashanova_lab1_kross.Migrations
{
    [DbContext(typeof(shatrashanova_lab1_krossContext))]
    partial class shatrashanova_lab1_krossContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ExerciseWorkout", b =>
                {
                    b.Property<int>("ExercisesID")
                        .HasColumnType("int");

                    b.Property<int>("WorkoutsID")
                        .HasColumnType("int");

                    b.HasKey("ExercisesID", "WorkoutsID");

                    b.HasIndex("WorkoutsID");

                    b.ToTable("ExerciseWorkout");
                });

            modelBuilder.Entity("shatrashanova_lab1_kross.Models.Exercise", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Calories")
                        .HasColumnType("int");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Repetitions")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Exercise");
                });

            modelBuilder.Entity("shatrashanova_lab1_kross.Models.Workout", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("Workout");
                });

            modelBuilder.Entity("ExerciseWorkout", b =>
                {
                    b.HasOne("shatrashanova_lab1_kross.Models.Exercise", null)
                        .WithMany()
                        .HasForeignKey("ExercisesID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("shatrashanova_lab1_kross.Models.Workout", null)
                        .WithMany()
                        .HasForeignKey("WorkoutsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
