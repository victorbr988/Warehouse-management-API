import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import "dotenv/config";
import * as express from 'express';

async function bootstrap() {
  const origin = process.env.ORIGIN || 'http://localhost:3000';
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser())
  app.use(express.json())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  
  app.enableCors({
    allowedHeaders: '*',
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  const config = new DocumentBuilder()
    .setTitle('V&M construções API')
    .setDescription('the V&M construções api documentation')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`App listen on localhost:${port}`)
}
bootstrap();
