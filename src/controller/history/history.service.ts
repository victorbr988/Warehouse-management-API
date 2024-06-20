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
    private productService: ProductService,
  ) {}

  public async getHistory({ take, skip }) {
    const [result, total] = await this.historyRepository
    .createQueryBuilder('history')
    .innerJoinAndSelect('history.product', 'product')
    .take(take)
    .skip(skip)
    .orderBy('history.createdAt', 'DESC')
    .select([
      'history.id',
      'history.type',
      'history.quantity',
      'history.createdAt',
      'product.id',
      'product.name',
    ])
    .getManyAndCount();
  
    const historyFormat = result.map((history) => ({
      id: history.id,
      productId: history.product.id,
      type: history.type,
      quantity: history.quantity,
      product: history.product.name,
      datetime: history.createdAt,
    }));

    return {
      data: historyFormat,
      count: total,
    };
  }

  public async createHistory({ type, quantity, productId }: HistoryDto) {
    const product = await this.productService.getProduct(productId);
    this.product = product;

    const historyDatabase = {
      type,
      quantity,
      product,
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