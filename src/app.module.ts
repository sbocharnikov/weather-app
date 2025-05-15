import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WeatherModule],
})
export class AppModule {}
