import { IsNumber, IsString } from 'class-validator';

export class ForecastDto {
  @IsString()
  cityName: string;

  @IsString()
  countryCode: string;

  @IsNumber()
  windSpeed: number;

  @IsString()
  windDirectionFull: string;

  @IsString()
  windDirection: string;

  @IsString()
  sunrise: string;

  @IsString()
  sunset: string;

  @IsNumber()
  pressure: number;

  @IsString()
  weatherDescription: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  lon: number;

  @IsNumber()
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
