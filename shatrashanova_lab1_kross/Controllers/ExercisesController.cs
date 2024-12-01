using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using shatrashanova_lab1_kross.Data;
using shatrashanova_lab1_kross.Models;

namespace shatrashanova_lab1_kross.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : Controller
    {
        private readonly shatrashanova_lab1_krossContext _context;

        public ExercisesController(shatrashanova_lab1_krossContext context)
        {
            _context = context;
        }

        // GET: api/exercise
        [HttpGet]
        public IActionResult GetExercises()
        {
            return new JsonResult(JsonConvert.SerializeObject(_context.Exercise.ToList()));
           
        }

        // GET: api/exercise/{id}
        [HttpGet("{id}")]
        public IActionResult GetExercise(int id)
        {
            var exercise = _context.Exercise.Find(id);
            if (exercise == null)
            {
                return NotFound();
            }
            return new JsonResult(JsonConvert.SerializeObject(exercise));
        }

        // POST: api/exercise
        [HttpPost]
        public IActionResult PostExercise([FromBody]Exercise exercise)
        {
            _context.Exercise.Add(new Exercise
            {
                Name = exercise.Name,
                Type = exercise.Type,
                Repetitions = exercise.Repetitions,
                Duration = exercise.Duration
            });
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetExercise), new { id = exercise.ID }, exercise);
        }

        // PUT: api/exercise/{id}
        [HttpPut("{id}")]
        public IActionResult PutExercise(int id, [FromBody]Exercise exercise)
        {
            if (id != exercise.ID)
            {
                return BadRequest();
            }

            _context.Entry(exercise).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/exercise/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteExercise(int id)
        {
            var exercise = _context.Exercise.Find(id);
            if (exercise == null)
            {
                return NotFound();
            }

            _context.Exercise.Remove(exercise);
            _context.SaveChanges();
            return NoContent();
        }
    }

    
}
