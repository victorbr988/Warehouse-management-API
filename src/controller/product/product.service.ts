import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createId } from "@paralleldrive/cuid2";
import { ProductDto } from "src/repository/dtos/product.dto";
import { Product } from "src/repository/entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async createProduct({ name, quantity }: ProductDto) {
    const productDatabase = {
      id: createId(),
      name,
      quantity
    }

    await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(productDatabase)
      .execute();
    
    return "Product created";
  }
}