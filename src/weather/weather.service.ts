import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PostWeatherDto } from './dto/postWeather.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Weather } from '@prisma/client';
import { WeatherResponseDto } from './dto/weatherResponse.dto';

import { openWeatherAPIClient } from 'src/utils/api/openWeatherClient';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async postWeather(weatherDto: PostWeatherDto) {
    try {
      const response: WeatherResponseDto =
        await openWeatherAPIClient.getWeatherData(weatherDto);
      const { lon, lat, ...info } = response;
      const { part } = weatherDto;

      const data: Prisma.WeatherCreateInput = {
        lon,
        lat,
        part,
        info,
      };

      const record = await this.prisma.weather.create({ data });

      return record;
    } catch (error) {
      console.log('Caught error:', error.message);
      if (
        error.message.includes(
          'Unique constraint failed on the fields: (`lat`,`lon`,`part`)',
        )
      ) {
        throw new HttpException(
          'Weather record with the same lat, lon, and part already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Error creating weather record.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWeather(query: {
    lat: number;
    lon: number;
    part?: string;
  }): Promise<Weather> {
    const record = await this.prisma.weather.findFirst({
      where: query,
    });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }
}
