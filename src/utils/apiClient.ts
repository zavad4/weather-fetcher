import config from 'src/config';
import HttpClient from './HttpClient';
import { PostWeatherDto } from 'src/weather/dto/postWeather.dto';

const baseURL = config.baseUrl;
const httpClient = new HttpClient(baseURL);

export const getWeather = async (params?: Record<string, any>) => {
  const result = await httpClient.get('/weather', params);
  return result;
};

export const postWeather = async (postData: PostWeatherDto) => {
  const result = await httpClient.post('/weather', postData);
  return result;
};
