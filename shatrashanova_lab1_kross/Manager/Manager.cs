using Microsoft.EntityFrameworkCore;
using shatrashanova_lab1_kross.Models;
using shatrashanova_lab1_kross.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace shatrashanova_lab1_kross.Manager
{
    public class Manager
    {
        private readonly shatrashanova_lab1_krossContext _context;

        public Manager(shatrashanova_lab1_krossContext context) {
            
            _context = context; 
        }
        public List<Exercise> GetExercise()
        {
            var exercises = _context.Exercise.ToList();

            return _context.Exercise.ToList();
        }

        public Exercise GetSigleExercise(int id)
        {
            var exercise = _context.Exercise.Find(id);
            return exercise;
        }
        public string PostExercise(ExerciseDTO exercise)
        {
            if (!exercise.IsAllowed())
            {
                return JsonConvert.SerializeObject(new { status = "Warning!", text = "You can't add exercise with this parameters because it may harm your health. Take care of yourself :)" });
            }
                _context.Exercise.Add(new Exercise
                {
                    Name = exercise.Name,
                    Type = exercise.Type,
                    Repetitions = exercise.Repetitions,
                    Duration = exercise.Duration,
                    Calories = exercise.Calories,
                });
                _context.SaveChanges();
                return JsonConvert.SerializeObject(exercise);
            
        }
    }
    
}
