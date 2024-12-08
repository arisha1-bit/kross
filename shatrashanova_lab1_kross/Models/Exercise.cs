using System.ComponentModel.DataAnnotations.Schema;

namespace shatrashanova_lab1_kross.Models
{
    public class Exercise
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Calories {  get; set; }
        public int Repetitions { get; set; }
        public int Duration { get; set; }
        public List<Workout> Workouts { get; set; } = [];

    }

    public class ExerciseDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Calories { get; set; }
        public int Repetitions { get; set; }
        public int Duration { get; set; }

        public bool IsAllowed()
        {
            if (Type == "Strength" && Repetitions > 100)
            {
                return false;
            } else if (Type == "Cardio" && Duration > 100)
            {
                return false;
            }
            return true;
        }
    }

}
