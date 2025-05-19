import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'node:path';
import { WeatherModule } from './modules/weather/weather.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!config) {
          throw new Error('Database config not found');
        }
        return config;
      },
    }),
    WeatherModule,
    SubscriptionModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/',
      exclude: ['/api/'],
    }),
  ],
})
export class AppModule {}
