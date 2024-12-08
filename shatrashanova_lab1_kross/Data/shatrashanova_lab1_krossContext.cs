using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using shatrashanova_lab1_kross.Models;

namespace shatrashanova_lab1_kross.Data
{
    public class shatrashanova_lab1_krossContext : DbContext
    {
        public shatrashanova_lab1_krossContext (DbContextOptions<shatrashanova_lab1_krossContext> options)
            : base(options)
        {
        }

        public DbSet<shatrashanova_lab1_kross.Models.Exercise> Exercise { get; set; } = default!;
        public DbSet<shatrashanova_lab1_kross.Models.Workout> Workout { get; set; } = default!;


    }
}
