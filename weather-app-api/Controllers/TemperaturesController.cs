using System.Collections.Generic;
using System.Threading.Tasks;
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

        // POST: api/Temperatures
        [HttpPost]
        public async Task<bool> PostTemperature(Temperature temperature)
        {
            var newTemperature = _context.Temperatures.Add(temperature);
            await _context.SaveChangesAsync();

            return true;
        }
        
    }
}
