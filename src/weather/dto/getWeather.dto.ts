import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class WeatherDataDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'Sunrise must be a number' })
  readonly sunrise: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Sunset must be a number' })
  readonly sunset: number;

  @IsOptional()
  @IsNumber({}, { message: 'Temperature must be a number' })
  readonly temp?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Feels Like must be a number' })
  readonly feels_like?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Pressure must be a number' })
  readonly pressure?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Humidity must be a number' })
  readonly humidity?: number;

  @IsOptional()
  @IsNumber({}, { message: 'UV Index must be a number' })
  readonly uvi?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Wind Speed must be a number' })
  readonly wind_speed?: number;
}
