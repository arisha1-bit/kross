using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
            try
            {
                var exercise = _context.Exercise.Find(id);
                if (exercise == null)
                {
                    return NotFound();
                }
                return new JsonResult(JsonConvert.SerializeObject(exercise));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/exercise
        [HttpPost]
        public IActionResult PostExercise([FromBody]ExerciseDTO exercise)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/exercise/{id}
        [HttpPut("{id}")]
        public IActionResult PutExercise(int id, [FromBody]ExerciseDTO exerciseDTO)
        {
            try
            {
                if (exerciseDTO == null)
                {
                    return BadRequest();
                }
                

                var existingExercise = _context.Exercise.Find(exerciseDTO.ID);
                
                if (existingExercise == null)
                {
                    return NotFound();
                }

                existingExercise.Name = exerciseDTO.Name;
                existingExercise.Type = exerciseDTO.Type;
                existingExercise.Repetitions = exerciseDTO.Repetitions;
                existingExercise.Duration = exerciseDTO.Duration;
                _context.Entry(existingExercise).State = EntityState.Modified;
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/exercise/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteExercise(int id)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    
}
