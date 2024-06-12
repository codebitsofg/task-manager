// @ts-nocheck
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as session from 'express-session'
import { sessionOptions } from './config/sessionConfig'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://application.taskermanager.site',
    credentials: true
  })

  app.set('trust proxy', 1)
  app.enable('trust proxy')

  app.use(session(sessionOptions))
  console.log(`--- app is listening on ${process.env.PORT}`)

  const config = new DocumentBuilder()
    .setTitle('Task Manager Api')
    .setDescription('The documentation to interact with the api')
    .setVersion('1.0')
    .addTag('apidoc')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
