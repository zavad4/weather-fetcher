import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { WeatherService } from '../src/weather/weather.service';
import { HttpModule } from '@nestjs/axios';
import { postWeather } from 'src/utils/apiClient';

describe('WeatherService', () => {
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService, PrismaService],
      imports: [HttpModule],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);

    const fixture = {
      lat: 1,
      lon: 1,
      part: 'current',
      info: {
        current: {
          sunrise: 1684926645,
          sunset: 1684977332,
          temp: 292.55,
          feels_like: 292.87,
          pressure: 1014,
          humidity: 89,
          uvi: 0.16,
          wind_speed: 3.13,
        },
      },
    };

    await prismaService.weather.deleteMany();
    await prismaService.weather.create({ data: fixture });
  });

  afterAll(() => prismaService.weather.deleteMany());

  it('should create a weather record without part', async () => {
    const weather = { lat: 4, lon: 4 };

    const response = await postWeather(weather);
    const record = await prismaService.weather.findFirst({ where: weather });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('current');
    expect(response).toHaveProperty('hourly');
    expect(response).toHaveProperty('daily');
    expect(record.lat).toBe(weather.lat);
    expect(record.lon).toBe(weather.lon);
    expect(record.part).toBeNull();
    expect(record.info).toHaveProperty('current');
    expect(record.info).toHaveProperty('hourly');
    expect(record.info).toHaveProperty('daily');
  });

  it('should create and retrieve a weather record with part', async () => {
    const weather = { lat: 4, lon: 4, part: 'daily' };

    const response = await postWeather(weather);
    const record = await prismaService.weather.findFirst({ where: weather });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('current');
    expect(response).toHaveProperty('hourly');
    expect(record.lat).toBe(weather.lat);
    expect(record.lon).toBe(weather.lon);
    expect(record.part).toBe(weather.part);
    expect(record.info).toHaveProperty('current');
    expect(record.info).toHaveProperty('hourly');
  });

  it('should not create a weather record with same lat, lon, part', async () => {
    const weather = { lat: 1, lon: 1, part: 'current' };

    const response = await postWeather(weather);
    expect(response).toStrictEqual({
      message:
        'Weather record with the same lat, lon, and part already exists.',
      statusCode: 400,
    });
  });
});
