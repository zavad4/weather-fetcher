import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PostWeatherDto } from './dto/postWeather.dto';
import { catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import config from '../config';
import { PrismaService } from 'src/prisma.service';
import { Weather } from '@prisma/client';
import { WeatherResponseDto } from './dto/weatherResponse.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AxiosError } from 'axios';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async callWeatherApi(
    weatherDto: PostWeatherDto,
  ): Promise<WeatherResponseDto> {
    const { lat, lon, part } = weatherDto;
    const apiUrl = `${config.weatherApiBaseUrl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${config.apiKey}`;

    const { data } = await firstValueFrom(
      this.httpService.get<WeatherResponseDto>(apiUrl).pipe(
        catchError((error: AxiosError) => {
          console.log('AxiosError: ', error.message);
          throw new HttpException(
            'An error happened',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
    return data;
  }

  async postWeather(weatherDto: PostWeatherDto) {
    try {
      const response = await this.callWeatherApi(weatherDto);
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
      console.log('Caught error:', error.name);
      if (error instanceof PrismaClientKnownRequestError) {
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
