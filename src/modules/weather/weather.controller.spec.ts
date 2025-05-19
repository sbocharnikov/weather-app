import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

const mockWeatherService = {
  getWeather: jest.fn(),
};

describe('WeatherController', () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherController,
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get weather', async () => {
    const mockWeather = {
      temperature: 20,
      humidity: 50,
      description: 'Sunny',
    };
    jest.spyOn(mockWeatherService, 'getWeather').mockResolvedValue(mockWeather);
    const result = await controller.getWeather('London');
    expect(result).toEqual(mockWeather);
  });

  it('should throw an error if no city is provided', async () => {
    await expect(controller.getWeather('')).rejects.toThrow('Invalid request');
  });
});
