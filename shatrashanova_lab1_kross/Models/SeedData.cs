using shatrashanova_lab1_kross.Data;
using System;
using Microsoft.EntityFrameworkCore;

namespace shatrashanova_lab1_kross.Models
{
    public class SeedData
    {

            public static void Initialize(IServiceProvider serviceProvider)
            {
                using (var context = new shatrashanova_lab1_krossContext(serviceProvider.GetRequiredService<DbContextOptions<shatrashanova_lab1_krossContext>>()))
                {
                    if (!context.Exercise.Any())
                    {
                        context.Exercise.AddRange(
                            new Exercise { Name = "Push-ups", Type = "Strength", Repetitions = 15, Calories = 100, Duration = 5 },
                            new Exercise { Name = "Running", Type = "Cardio", Repetitions = 1, Calories = 300, Duration = 30 }
                        );
                    }

                    if (!context.Workout.Any())
                    {
                        context.Workout.Add(new Workout
                        {
                            Date = DateTime.Now,
                            Exercises = new List<Exercise>
                    {
                        new Exercise { Name = "Squats", Type = "Strength", Repetitions = 20, Calories=150, Duration = 10 }
                    }
                        });
                    }

                    context.SaveChanges();
                }
            }
        }

    }

