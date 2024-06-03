import { Injectable, NotFoundException } from "@nestjs/common";
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

  public async updateProduct(id: string, productDto: ProductDto) {
    const { name, quantity } = productDto;
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException();
    }

    const productDatabase = {
      ...product,
      name,
      quantity: quantity || product.quantity
    }

    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set(productDatabase)
      .where("id = :id", { id })
      .execute();

    return "Product updated";
  }

  public async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new Error("Product not found");
    }

    await this.productRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();

    return "Product deleted";
  }
}