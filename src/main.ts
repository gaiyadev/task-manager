import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const version = 'v1';
  app.setGlobalPrefix(`api/${version}`);
  const PORT = 8080;
  await app.listen(PORT);
}
bootstrap();
