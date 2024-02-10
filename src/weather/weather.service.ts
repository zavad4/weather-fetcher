import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PostWeatherDto } from './dto/postWeather.dto';
import { WeatherDataDto } from './dto/getWeather.dto';
import { map } from 'rxjs/operators';
import config from '../config';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  postWeather(
    weatherDto: PostWeatherDto,
  ): Observable<AxiosResponse<WeatherDataDto>> {
    const { lat, lon, part } = weatherDto;
    const apiUrl = `${config.weatherApiBaseUrl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${config.apiKey}`;

    return this.httpService
      .get(apiUrl)
      .pipe(map((response) => response.data?.current));
  }

  getWeather(weatherDto: PostWeatherDto): WeatherDataDto {
    console.log(weatherDto);
    const weather = {
      sunrise: 1684926645,
      sunset: 1684977332,
      temp: 292.55,
      feels_like: 292.87,
      pressure: 1014,
      humidity: 89,
      uvi: 0.16,
      wind_speed: 3.13,
    };

    return weather;
  }
}
