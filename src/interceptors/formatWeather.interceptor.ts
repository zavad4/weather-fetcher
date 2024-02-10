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
        return {
          sunrise: response.sunrise,
          sunset: response.sunset,
          temp: response.temp,
          feels_like: response.feels_like,
          pressure: response.pressure,
          humidity: response.humidity,
          uvi: response.uvi,
          wind_speed: response.wind_speed,
        };
      }),
    );
  }
}
