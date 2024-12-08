using System.ComponentModel.DataAnnotations.Schema;

namespace shatrashanova_lab1_kross.Models
{
    public class Workout
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }

        public List<Exercise> Exercises { get; set; } = [];

        public bool IsAllowed()
        {
            if (Exercises.Sum(x => x.Calories) > 1000)
            {
                return false;
            } else if (Exercises.Sum(x=>x.Duration) > 120)
            {
                return false;
            }
            return true;
        }

    }

    public class WorkoutDTO
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public List<int> Exercises { get; set; } = [];


    }
}
