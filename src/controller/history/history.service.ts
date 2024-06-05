import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createId } from "@paralleldrive/cuid2";
import { HistoryDto } from "src/repository/dtos/history.dto";
import { HistoryMovimentation, HistoryMovimentationType } from "src/repository/entity/history-movimentation.entity";
import { Repository } from "typeorm";
import { ProductService } from "../product/product.service";
import { Product } from "src/repository/entity/product.entity";

@Injectable()
export class HistoryService {
  private product: Product;
  constructor(
    @InjectRepository(HistoryMovimentation)
    private historyRepository: Repository<HistoryMovimentation>,

    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  public async getHistory({ take, skip }) {
    const [result , total] = await this.historyRepository.findAndCount({
      take: take || 10,
      skip: skip || 0,
      order: {
        createdAt: "DESC"
      }
    });

    return {
      data: result,
      count: total
    };
  }

  public async createHistory({ type, quantity, productId }: HistoryDto) {
    const product = await this.productService.getProduct(productId);
    this.product = product;

    const historyDatabase = {
      id: createId(),
      type,
      quantity,
      productId,
    }

    await this.historyRepository
      .createQueryBuilder()
      .insert()
      .into(HistoryMovimentation)
      .values(historyDatabase)
      .execute();

    await this.updateProductByHistory({ type, quantity, productId });

    return "History created";
  }

  private async updateProductByHistory(history: HistoryDto) {
    if (history.type === HistoryMovimentationType.ENTRANCE) {
      await this.productService.updateProduct(this.product.id, {
        name: this.product.name,
        quantity: this.product.quantity + history.quantity
      });
    }

    if (history.type === HistoryMovimentationType.EXIT) {
      await this.productService.updateProduct(this.product.id, {
        name: this.product.name,
        quantity: this.product.quantity - history.quantity
      });
    }
  }
}