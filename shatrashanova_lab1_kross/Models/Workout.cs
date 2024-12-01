using System.ComponentModel.DataAnnotations.Schema;

namespace shatrashanova_lab1_kross.Models
{
    public class Workout
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int ID { get; set; }
        public DateTime Date { get; set; }
        
        public List<Exercise> Exercises { get; set; }

    }
}
