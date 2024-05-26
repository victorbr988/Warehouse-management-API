import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/entity/user.entity';
import { SessionController } from './controller/session/session.controller';
import { SessionModule } from './controller/session/session.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controller/user/user.module';
import { UserController } from './controller/user/user.controller';

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
    UserModule
  ],
  controllers: [
    SessionController,
    UserController,
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}