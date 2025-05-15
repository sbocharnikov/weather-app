import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Weather } from './dto/weather.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('weather')
  async getWeather(@Query('city') city: string): Promise<Weather> {
    if (!city) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    
    return this.appService.getWeather(city);
  }
}
