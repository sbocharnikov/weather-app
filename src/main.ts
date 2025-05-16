import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: () =>
        new HttpException('Invalid input', HttpStatus.BAD_REQUEST),
      stopAtFirstError: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
