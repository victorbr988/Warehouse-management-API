import { Module, forwardRef } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryController } from "./history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryMovimentation } from "src/repository/entity/history-movimentation.entity";
import { ProductModule } from "../product/product.module";

@Module({
  imports: [TypeOrmModule.forFeature([HistoryMovimentation]), forwardRef(() => ProductModule)],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}