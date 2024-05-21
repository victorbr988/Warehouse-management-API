import { Module } from "@nestjs/common";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/repository/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}