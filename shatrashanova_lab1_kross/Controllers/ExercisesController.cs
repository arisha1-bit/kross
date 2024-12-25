using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using shatrashanova_lab1_kross.Data;
using shatrashanova_lab1_kross.Models;
using shatrashanova_lab1_kross.Manager;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace shatrashanova_lab1_kross.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : Controller


    {
        private readonly shatrashanova_lab1_krossContext _context;
        public Manager.Manager manager;
        public ExercisesController(shatrashanova_lab1_krossContext context)
        {
            _context = context;
            manager = new Manager.Manager(context);
        }

        // GET: api/exercise
        [HttpGet]
        public ActionResult<List<Exercise>> GetExercises()

        {
            try
            {   
                return manager.GetExercise();
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        
           
        }

        // GET: api/exercise/{id}
        [HttpGet("{id}")]
        public ActionResult<Exercise> GetExercise(int id)
        {
            try
            {
                return manager.GetSigleExercise(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/exercise
        [HttpPost]
        [Authorize]
        public ActionResult<string> PostExercise([FromBody]ExerciseDTO exercise)
        {
            

            try
            {
                
                if (!exercise.IsAllowed())
                {
                    return BadRequest("{\"message\":\"You can't add workout with this parameters because it may harm your health. Try to choose another exercises. Take care of yourself :)\"}");
                }
                return manager.PostExercise(exercise);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/exercise/{id}
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult PutExercise(int id, [FromBody]ExerciseDTO exerciseDTO)
        {
            if (!exerciseDTO.IsAllowed())
            {
                return BadRequest("{\"message\":\"You can't add workout with this parameters because it may harm your health. Try to choose another exercises. Take care of yourself :)\"}");
            }

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
        [Authorize]
        public ActionResult DeleteExercise(int id)
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
