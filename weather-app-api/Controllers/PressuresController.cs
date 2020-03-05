using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weather_app_api.Models;

namespace weather_app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PressuresController : ControllerBase
    {
        private readonly WeatherContext _context;

        public PressuresController(WeatherContext context)
        {
            _context = context;
        }

        // GET: api/Pressures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pressure>>> GetPressures()
        {
            return await _context.Pressures.ToListAsync();
        }

        // GET: api/Pressures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pressure>> GetPressure(long id)
        {
            var pressure = await _context.Pressures.FindAsync(id);

            if (pressure == null)
            {
                return NotFound();
            }

            return pressure;
        }

        // PUT: api/Pressures/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPressure(long id, Pressure pressure)
        {
            if (id != pressure.Id)
            {
                return BadRequest();
            }

            _context.Entry(pressure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PressureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pressures
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Pressure>> PostPressure(Pressure pressure)
        {
            var addedPressure =_context.Pressures.Add(pressure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPressure", addedPressure);
        }

        // DELETE: api/Pressures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Pressure>> DeletePressure(long id)
        {
            var pressure = await _context.Pressures.FindAsync(id);
            if (pressure == null)
            {
                return NotFound();
            }

            _context.Pressures.Remove(pressure);
            await _context.SaveChangesAsync();

            return pressure;
        }

        private bool PressureExists(long id)
        {
            return _context.Pressures.Any(e => e.Id == id);
        }
    }
}
