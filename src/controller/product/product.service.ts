import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/repository/dtos/product.dto";
import { Product } from "src/repository/entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  public async getProductList() {
    const products = await this.productRepository.createQueryBuilder()
      .select("*")
      .getRawMany();
      
    return products;
  }

  public async createProduct({ name, quantity }: ProductDto) {
    const productDatabase = {
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
  public async getProduct(id: string) {
    const product = await this.productRepository
      .createQueryBuilder("product")
      .select([
        "product.id as id",
        "product.name as name",
        "SUM(CASE WHEN historyMovimentations.type = '1' THEN historyMovimentations.quantity ELSE 0 END) as total_entrance",
        "SUM(CASE WHEN historyMovimentations.type = '2' THEN historyMovimentations.quantity ELSE 0 END) as total_exit",
        `product.quantity as quantity`,
      ])
      .innerJoin("product.historyMovimentations", "historyMovimentations")
      .where("product.id = :id", { id })
      .groupBy("product.id")
      .addGroupBy("product.name")
      .addGroupBy("product.quantity")
      .getRawOne();

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
  }
}