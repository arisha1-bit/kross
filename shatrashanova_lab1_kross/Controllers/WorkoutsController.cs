using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using shatrashanova_lab1_kross.Data;
using shatrashanova_lab1_kross.Models;
using Newtonsoft.Json;

namespace shatrashanova_lab1_kross.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : Controller
    {
        private readonly shatrashanova_lab1_krossContext _context;

        public WorkoutsController(shatrashanova_lab1_krossContext context)
        {
            _context = context;
        }

        // GET: api/workout
        [HttpGet]
        public IActionResult GetWorkouts()
        {
            return new JsonResult(JsonConvert.SerializeObject(_context.Workout
                .Include(w => w.Exercises) // Подгружаем связанные упражнения
                .ToList()));
        }

        // GET: api/workout/{id}
        [HttpGet("{id}")]
        public IActionResult GetWorkout(int id)
        {
            var workout = _context.Workout
                .Include(w => w.Exercises) // Подгружаем связанные упражнения
                .FirstOrDefault(w => w.ID == id);

            if (workout == null)
            {
                return NotFound();
            }

            return new JsonResult(JsonConvert.SerializeObject(workout)); ;
        }

        // POST: api/workout
        [HttpPost]
        public IActionResult PostWorkout([FromBody]Workout workout)
        {
            // Проверяем, есть ли упражнения, и корректно ли они привязаны
            if (workout.Exercises != null)
            {
                foreach (var exercise in workout.Exercises)
                {
                    _context.Entry(exercise).State = EntityState.Unchanged;
                }
            }

            _context.Workout.Add(workout);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetWorkout), new { id = workout.ID }, workout);
        }

        // PUT: api/workout/{id}
        [HttpPut("{id}")]
        public IActionResult PutWorkout(int id, [FromBody]Workout workout)
        {
            if (id != workout.ID)
            {
                return BadRequest();
            }

            // Обновляем данные тренировки
            _context.Entry(workout).State = EntityState.Modified;

            // Обновляем вложенные упражнения
            if (workout.Exercises != null)
            {
                foreach (var exercise in workout.Exercises)
                {
                    _context.Entry(exercise).State = EntityState.Unchanged;
                }
            }

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/workout/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteWorkout(int id)
        {
            var workout = _context.Workout
                .Include(w => w.Exercises) // Подгружаем связанные упражнения
                .FirstOrDefault(w => w.ID == id);

            if (workout == null)
            {
                return NotFound();
            }

            _context.Workout.Remove(workout);
            _context.SaveChanges();
            return NoContent();
        }

        // Дополнительный запрос: Тренировки длительностью более 60 минут
        [HttpGet("long")]
        public IActionResult GetLongWorkouts()
        {
            var longWorkouts = _context.Workout
                .Include(w => w.Exercises)
                .Where(w => w.Exercises.Sum(e => e.Duration) > 60) // Фильтрация по общей длительности
                .ToList();

            return new JsonResult(JsonConvert.SerializeObject(longWorkouts));
        }
    }
}
