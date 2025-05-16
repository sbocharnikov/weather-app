import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherData } from './modules/weather/weatherData.interface';
import { WeatherResponseDto } from './modules/weather/dto/weatherResponse.dto';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getWeather(city: string): Promise<WeatherResponseDto> {
    const key = this.configService.get<string>('WEATHERAPI_KEY');
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    const response = await firstValueFrom(
      this.httpService.get<WeatherData>(url).pipe(
        catchError(() => {
          throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        }),
      ),
    );

    return this.toWeatherDto(response.data);
  }

  toWeatherDto(data: WeatherData): WeatherResponseDto {
    return {
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      description: data.current.condition.text,
    };
  }
}
