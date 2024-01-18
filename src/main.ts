// @ts-nocheck
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as session from 'express-session'
import { sessionOptions } from './session/session.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://app.taskermanager.online',
    credentials: true
  })

  app.use(session(sessionOptions))
  console.log(`--- app is listening oooon ${process.env.PORT}`)
  await app.listen(process.env.PORT ?? 3005)
}
bootstrap()
