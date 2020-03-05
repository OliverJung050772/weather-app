using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_app_api.Models
{
    public class Pressure
    {
        public long Id { get; set; }
        public long TimeStamp { get; set; }
        public double MeasuredValue { get; set; }
    }
}
