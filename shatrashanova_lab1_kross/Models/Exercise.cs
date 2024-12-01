using System.ComponentModel.DataAnnotations.Schema;

namespace shatrashanova_lab1_kross.Models
{
    public class Exercise
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int ID { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }
        public int Repetitions { get; set; }
        public int Duration { get; set; }
    }
}
