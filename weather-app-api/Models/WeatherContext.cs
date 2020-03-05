using Microsoft.EntityFrameworkCore;

namespace weather_app_api.Models
{
    public class WeatherContext : DbContext
    {
        public WeatherContext(DbContextOptions<WeatherContext> options)
            : base(options)
        {

        }

        public DbSet<Temperature> Temperatures { get; set; }
        public DbSet<BarometicPressure> Pressures { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=weather.db");
    }
}
