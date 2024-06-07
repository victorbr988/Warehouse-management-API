import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import "dotenv/config";

async function bootstrap() {
  const origin = process.env.ORIGIN || 'http://localhost:3000';
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .setTitle('V&M construções API')
    .setDescription('the V&M construções api documentation')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
  }),);

  app.use(cookieParser())
  app.enableCors({
    origin,
  });
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`App listen on localhost:${port}`)
}
bootstrap();
