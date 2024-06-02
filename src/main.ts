import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('V&M construções API')
    .setDescription('the V&M construções api documentation')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
  }),);
  app.use(cookieParser())
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  console.log(`App listen on localhost:${3000}`)
}
bootstrap();
