import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ProductByIdDto, ProductDto } from "src/repository/dtos/product.dto";
import { ProductService } from "./product.service";

@ApiTags("product")
@Controller("product")
export class ProductController {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  @Get("list")
  @ApiResponse({ status: 200, description: 'Product list successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async getProductList(@Res() res: Response) {
    try {
      const productList = await this.productService.getProductList();
      return res.status(HttpStatus.OK).json(productList);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: 'Product list successfully', type: ProductByIdDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async getProductById(@Param("id") id: string, @Res() res: Response) {
    try {
      const product = await this.productService.getProduct(id);
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
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

  @Put("update")
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async updateProduct(@Param() id: string, @Body() productDto: ProductDto, @Res() res: Response) {
    try {
      if (!id) {
        throw new BadRequestException("Id is required");
      }

      const { name, quantity } = productDto;
      await this.productService.updateProduct(id, { name, quantity });
      return res.status(HttpStatus.CREATED).json({ message: "Product created successfully" });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @Delete("delete")
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async deleteProduct(@Param() id: string, @Res() res: Response) {
    try {
      if (!id) {
        throw new BadRequestException("Id is required");
      }

      await this.productService.deleteProduct(id);
      return res.status(HttpStatus.CREATED).json({ message: "Product created successfully" });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}