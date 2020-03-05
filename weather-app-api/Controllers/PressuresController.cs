using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<ActionResult<IEnumerable<BarometicPressure>>> GetPressures()
        {
            return await _context.Pressures.ToListAsync();
        }

        // POST: api/Pressures
        [HttpPost]
        public async Task<bool> PostPressure(BarometicPressure pressure)
        {
 
            var addedPressure = _context.Pressures.Add(pressure);
            await _context.SaveChangesAsync();

            return (true);

        }
       
    }
}
