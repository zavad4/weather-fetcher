import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
  Max,
  Min,
} from 'class-validator';

export class PostWeatherDto {
  @IsNotEmpty({ message: 'Latitude is required' })
  @IsNumber({}, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must be greater than or equal to -90' })
  @Max(90, { message: 'Latitude must be less than or equal to 90' })
  readonly lat: number;

  @IsNotEmpty({ message: 'Longitude is required' })
  @IsNumber({}, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must be greater than or equal to -180' })
  @Max(180, { message: 'Longitude must be less than or equal to 180' })
  readonly lon: number;
  @IsOptional()
  @IsString({ message: 'Part must be a string' })
  @IsIn(['current', 'minutely', 'hourly', 'daily', 'alerts'], {
    message: 'Invalid part value',
  })
  readonly part?: string;
}
