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
using Microsoft.AspNetCore.Authorization;

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
        public ActionResult<List<WorkoutDTO>> GetWorkouts()
        {
            var workouts = _context.Workout.Include(w => w.Exercises).ToList(); // Подгружаем связанные упражнения

            return workouts
                .Select(x => new WorkoutDTO { 
                    ID = x.ID,
                    Date = x.Date,
                    Exercises = x.Exercises.Select(x => x.ID).ToList()
                }).ToList();
        }

        // GET: api/workout/{id}
        [HttpGet("{id}")]
        public ActionResult<WorkoutDTO> GetWorkout(int id)
        {
            try
            {
                var workout = _context.Workout
                    .Include(w => w.Exercises) // Подгружаем связанные упражнения
                    .FirstOrDefault(w => w.ID == id);

                if (workout == null)
                {
                    return NotFound();
                }

                return 
                    new WorkoutDTO { 
                        ID = workout.ID,
                        Date = workout.Date,
                        Exercises = workout.Exercises.Select(x=>x.ID).ToList()
                    };
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/workout
        [HttpPost]
        [Authorize]
        public ActionResult PostWorkout([FromBody]WorkoutDTO workoutDTO)
        {
            // Проверяем, есть ли упражнения, и корректно ли они привязаны
            try
            {
                var exercises = new List<Exercise>();
                if (workoutDTO.Exercises != null)
                {
                    foreach (var exerciseID in workoutDTO.Exercises)
                    {
                        var exercise = _context.Exercise.Find(exerciseID);
                        if (exercise == null)
                        {
                            return BadRequest();
                        }
                        exercises.Add(exercise);
                        _context.Entry(exercise).State = EntityState.Unchanged;
                    }
                }

                var workout = new Workout
                {
                    Date = workoutDTO.Date,
                    Exercises = exercises
                };
                if (!workout.IsAllowed())
                {
                    return BadRequest("{\"message\":\"You can't add workout with this parameters because it may harm your health. Try to choose another exercises. Take care of yourself :)\"}");
                }

                _context.Workout.Add(workout);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetWorkout), new { id = workoutDTO.ID }, workoutDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/workout/{id}
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult PutWorkout(int id, [FromBody]WorkoutDTO workoutDTO) 
        {
            if (id != workoutDTO.ID)
            {
                return BadRequest();
            }


            try
            {

                var workout = _context.Workout
                    .Include(w => w.Exercises)
                    .FirstOrDefault(w => w.ID == id);

                if (workout == null)
                {
                    return NotFound();
                }

                workout.Date = workoutDTO.Date;
                workout.Exercises.Clear();

                var exercises = _context.Exercise.Where(e=> workoutDTO.Exercises.Contains(e.ID)).ToList();

                workout.Exercises.AddRange(exercises);

                if (!workout.IsAllowed())
                {
                    return new JsonResult(new { status = "Warning!", text = "You can't add workout with this parameters because it may harm your health. Try to choose another exercises. Take care of yourself :)" });
                }
                // Обновляем данные тренировки
                _context.Entry(workout).State = EntityState.Modified;

                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/workout/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeleteWorkout(int id)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Дополнительный запрос: Тренировки длительностью более 60 минут
        [HttpGet("long")]
        public ActionResult<List<WorkoutDTO>> GetLongWorkouts()
        {
            try
            {
                var longWorkouts = _context.Workout
                    .Include(w => w.Exercises)
                    .Where(w => w.Exercises.Sum(e => e.Duration) > 60) // Фильтрация по общей длительности
                    .ToList();

                return longWorkouts
                .Select(x => new WorkoutDTO
                {
                    ID = x.ID,
                    Date = x.Date,
                    Exercises = x.Exercises.Select(x => x.ID).ToList()
                }).ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
