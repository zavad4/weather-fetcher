import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostWeatherDto } from './dto/postWeather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  @UsePipes(new ValidationPipe())
  postWeather(@Body() weatherDto: PostWeatherDto) {
    return this.weatherService.postWeather(weatherDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UsePipes(new ValidationPipe())
  getWeather(@Body() weatherDto: PostWeatherDto) {
    return this.weatherService.getWeather(weatherDto);
  }
}
