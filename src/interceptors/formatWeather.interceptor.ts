import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatWeatherResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const formattedResponse = {
          lat: response.lat,
          lon: response.lon,
          part: response.part,
          current: response.info.current
            ? mapWeather(response.info.current)
            : null,
          minutely: response.info.minutely
            ? response.info.minutely.map(mapWeather)
            : null,
          hourly: response.info.hourly
            ? response.info.hourly.map(mapWeather)
            : null,
          daily: response.info.daily
            ? response.info.daily.map(mapWeather)
            : null,
        };
        return formattedResponse;
      }),
    );
  }
}

function mapWeather(data) {
  return {
    sunrise: data.sunrise,
    sunset: data.sunset,
    temp: data.temp,
    feels_like: data.feels_like,
    pressure: data.pressure,
    humidity: data.humidity,
    uvi: data.uvi,
    wind_speed: data.wind_speed,
  };
}
