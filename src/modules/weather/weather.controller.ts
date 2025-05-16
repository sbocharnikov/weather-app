import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherResponseDto } from 'src/dto/weather.interface';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string): Promise<WeatherResponseDto> {
    if (!city) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    return this.weatherService.getWeather(city);
  }
}
