import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`--- app is listening on ${process.env.PORT}`)
  await app.listen(process.env.PORT);
}
bootstrap();
