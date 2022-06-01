import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ForecastDto } from 'common/models/forecast/dto/ForecastDto';

@Injectable()
export class ForecastService {
  constructor(private http: HttpService) {}

  async getCurrentForecast(city, country) {
    const API_WEATHER_KEY = process?.env?.API_WEATHER_KEY;
    const API_WEATHER_ENDPOINT = process?.env?.API_WEATHER_ENDPOINT;
    if (!API_WEATHER_KEY || !API_WEATHER_ENDPOINT) {
      throw new InternalServerErrorException('Server error!');
    }
    const url =
      API_WEATHER_ENDPOINT +
      `?city=${city}&country=${country}&key=${API_WEATHER_KEY}`;
    const forecast = await firstValueFrom(this.http.get(url));
    if (forecast.statusText === 'No Content') {
      throw new BadRequestException(
        'Can not find forecast for this country and city',
      );
    }
    return new ForecastDto(forecast.data.data[0]);
  }
}
