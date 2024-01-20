// @ts-nocheck
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as session from 'express-session'
import { sessionOptions } from './config/sessionConfig'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://app.taskermanager.online',
    // origin: 'http://localhost:3000',
    credentials: true
  })

  app.set('trust proxy', 1)
  app.enable('trust proxy')

  app.use(session(sessionOptions))
  console.log(`--- app is listening on ${process.env.PORT}`)
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
