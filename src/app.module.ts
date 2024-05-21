import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/entity/user.entity';
import { SessionController } from './controller/session/session.controller';
import { SessionModule } from './controller/session/session.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionService } from './controller/session/session.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'postfy',
      entities: [ User ],
      synchronize: true,
    }),
    SessionModule,
  ],
  controllers: [
    SessionController,
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}