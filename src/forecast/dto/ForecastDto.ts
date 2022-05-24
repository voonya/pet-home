export class ForecastDto {
  cityName: string;

  countryCode: string;

  windSpeed: number;

  windDirectionFull: string;

  windDirection: string;

  sunrise: string;

  sunset: string;

  pressure: number;

  weatherDescription: string;

  temperature: number;

  lon: number;

  lat: number;

  constructor(forecastData) {
    this.cityName = forecastData.city_name;
    this.countryCode = forecastData.country_code;
    this.windSpeed = forecastData.wind_spd;
    this.windDirectionFull = forecastData.wind_cdir_full;
    this.windDirection = forecastData.wind_cdir;
    this.sunrise = forecastData.sunrise;
    this.sunset = forecastData.sunset;
    this.pressure = forecastData.dni;
    this.weatherDescription = forecastData.weather.description;
    this.temperature = forecastData.temp;
    this.lon = forecastData.lon;
    this.lat = forecastData.lat;
  }
}
