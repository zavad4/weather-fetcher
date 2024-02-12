export default {
  database_url: `postgresql://${process.env.DB_USERNAME || 'postgres'}:${
    process.env.DB_PASSWORD || 'password'
  }@${
    process.env.DB_HOST || 'localhost'
  }:${+process.env.DB_PORT || 5432}/${process.env.DB_DATABASE || 'weather-fetcher_db'}?schema=public`,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000/api',
  weatherApiBaseUrl:
    process.env.WEATHER_API_BASE_URL ||
    'https://api.openweathermap.org/data/3.0/onecall',
  apiKey: process.env.API_KEY,
};
