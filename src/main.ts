import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://app.taskermanager.online/'
  })
  console.log(`--- app is listening oooon ${process.env.PORT}`)
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
