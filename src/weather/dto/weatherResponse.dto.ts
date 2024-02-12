type WeatherInfo = {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
};

export type WeatherResponseDto = {
  readonly lat: number;

  readonly lon: number;

  readonly part?: string;

  readonly current?: WeatherInfo;

  readonly minutely?: WeatherInfo[];

  readonly hourly?: WeatherInfo[];

  readonly daily?: WeatherInfo[];
};
