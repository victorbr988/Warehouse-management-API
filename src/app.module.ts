import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/entity/user.entity';
import { SessionController } from './controller/session/session.controller';
import { SessionModule } from './controller/session/session.module';
import { AppService } from './app.service';
import { UserModule } from './controller/user/user.module';
import { UserController } from './controller/user/user.controller';
import { HistoryMovimentation } from './repository/entity/history-movimentation.entity';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { Product } from './repository/entity/product.entity';
import { ProductModule } from './controller/product/product.module';
import { ProductController } from './controller/product/product.controller';
import { HistoryModule } from './controller/history/history.module';
import { HistoryController } from './controller/history/history.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'verceldb',
      autoLoadEntities: true,
      ssl: true,
      extra: {
        timezone: 'UTC',
      },
      entities: [ User, HistoryMovimentation, Product ],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
    ProductModule,
    UserModule,
    SessionModule,
    HistoryModule,
  ],
  controllers: [
    ProductController,
    UserController,
    SessionController,
    HistoryController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}