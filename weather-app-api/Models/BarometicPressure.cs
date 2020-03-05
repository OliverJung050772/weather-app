namespace weather_app_api.Models
{
    public class BarometicPressure
    {
        public long Id { get; set; }
        public long TimeStamp { get; set; }
        public double MeasuredValue { get; set; }
    }
}
