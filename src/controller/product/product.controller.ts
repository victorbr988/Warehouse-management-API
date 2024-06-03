import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ProductDto } from "src/repository/dtos/product.dto";
import { ProductService } from "./product.service";

@ApiTags("product")
@Controller("product")
export class ProductController {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  @Post("create")
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async createProduct(@Body() productDto: ProductDto, @Res() res: Response) {
    try {
      const { name, quantity } = productDto;
      await this.productService.createProduct({ name, quantity });
      return res.status(HttpStatus.CREATED).json({ message: "Product created successfully" });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}