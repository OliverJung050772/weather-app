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
    public class TemperaturesController : ControllerBase
    {
        private readonly WeatherContext _context;

        public TemperaturesController(WeatherContext context)
        {
            _context = context;
        }

        // GET: api/Temperatures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Temperature>>> GetTemperatures()
        {
            return await _context.Temperatures.ToListAsync();
        }

        // GET: api/Temperatures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Temperature>> GetTemperature(long id)
        {
            var temperature = await _context.Temperatures.FindAsync(id);

            if (temperature == null)
            {
                return NotFound();
            }

            return temperature;
        }

        // PUT: api/Temperatures/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemperature(long id, Temperature temperature)
        {
            if (id != temperature.Id)
            {
                return BadRequest();
            }

            _context.Entry(temperature).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemperatureExists(id))
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

        // POST: api/Temperatures
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Temperature>> PostTemperature(Temperature temperature)
        {
            _context.Temperatures.Add(temperature);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemperature", new { id = temperature.Id }, temperature);
        }

        // DELETE: api/Temperatures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Temperature>> DeleteTemperature(long id)
        {
            var temperature = await _context.Temperatures.FindAsync(id);
            if (temperature == null)
            {
                return NotFound();
            }

            _context.Temperatures.Remove(temperature);
            await _context.SaveChangesAsync();

            return temperature;
        }

        private bool TemperatureExists(long id)
        {
            return _context.Temperatures.Any(e => e.Id == id);
        }
    }
}
