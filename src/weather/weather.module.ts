import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { FormatWeatherResponseInterceptor } from 'src/interceptors/formatWeather.interceptor';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  providers: [
    WeatherService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatWeatherResponseInterceptor,
    },
  ],
  controllers: [WeatherController],
})
export class WeatherModule {}
