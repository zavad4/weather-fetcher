import { HttpException, HttpStatus } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { PostWeatherDto } from 'src/weather/dto/postWeather.dto';
import { WeatherResponseDto } from 'src/weather/dto/weatherResponse.dto';
import config from 'src/config';

class OpenWeatherApi {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherData(
    weatherDto: PostWeatherDto,
  ): Promise<WeatherResponseDto> {
    const { lat, lon, part } = weatherDto;
    const apiUrl = `${config.weatherApiBaseUrl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${config.apiKey}`;

    try {
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
    } catch (error) {
      throw new HttpException(
        'An error happened while fetching weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

const openWeatherAPIClient = new OpenWeatherApi(new HttpService());
export { openWeatherAPIClient };
