import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HistoryDto } from "src/repository/dtos/history.dto";
import { HistoryMovimentation, HistoryMovimentationType } from "src/repository/entity/history-movimentation.entity";
import { Repository } from "typeorm";
import { ProductService } from "../product/product.service";
import { Product } from "src/repository/entity/product.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class HistoryService {
  private product: Product;
  constructor(
    @InjectRepository(HistoryMovimentation)
    private historyRepository: Repository<HistoryMovimentation>,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  public async getHistory({ take, skip }) {
    if (!take || !skip) {
      const [result, total] =await this.historyRepository
      .createQueryBuilder('history')
      .innerJoinAndSelect('history.product', 'product')
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

  public async createHistory({ type, quantity, productId, email }: Record<string, any>) {
    const product = await this.productService.getProduct(productId);
    const user = await this.userService.getUserByEmail(email);
    this.product = product;

    const historyDatabase = {
      type,
      quantity,
      product,
      productId,
      user,
      userId: user.id,
    }

    await this.historyRepository
      .createQueryBuilder()
      .insert()
      .into(HistoryMovimentation)
      .values(historyDatabase)
      .execute();

    await this.updateProductByHistory({ type, quantity, productId, userId: user.id });

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