import { TestingModule, Test } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { WeatherData } from './weatherData.interface';
import { DeepPartial } from 'typeorm';
import { WeatherResponseDto } from './dto/weatherResponse.dto';

const mockConfigService = {
  get: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(),
};

const mockWeatherData: DeepPartial<WeatherData> = {
  location: {
    name: 'London',
  },
  current: {
    temp_c: 20,
    humidity: 50,
    condition: {
      text: 'Sunny',
    },
  },
};

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return weather data', async () => {
    const mockWeatherResponseDto: WeatherResponseDto = {
      temperature: 20,
      humidity: 50,
      description: 'Sunny',
    };

    const httpGetSpy = jest
      .spyOn(mockHttpService, 'get')
      .mockReturnValue(of({ data: mockWeatherData }));
    const toWeatherDtoSpy = jest
      .spyOn(service, 'toWeatherDto')
      .mockReturnValue(mockWeatherResponseDto);
    const weatherData = await service.getWeather('London');
    expect(httpGetSpy).toHaveBeenCalled();
    expect(toWeatherDtoSpy).toHaveBeenCalledWith(mockWeatherData);
    expect(weatherData).toEqual(mockWeatherResponseDto);
    expect(mockHttpService.get).toHaveBeenCalled();
  });

  it('should throw 404 error if the city is not found', () => {
    jest
      .spyOn(mockHttpService, 'get')
      .mockReturnValue(throwError(() => new Error('')));
    service.getWeather('London').catch((e: Error) => {
      expect(e.message).toEqual('City not found');
    });
  });

  it('should transform to weatherDto ', () => {
    jest.spyOn(service, 'toWeatherDto');
    const result = service.toWeatherDto(mockWeatherData as WeatherData);
    expect(result).toEqual({
      temperature: 20,
      humidity: 50,
      description: 'Sunny',
    });
  });
});
