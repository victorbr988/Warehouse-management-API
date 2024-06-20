import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductDto {
  @ApiProperty({
    description: "Nome do produto",
    type: String,
    required: true
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Quantidade do produto",
    type: String,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class ProductByIdDto {
  @ApiProperty({
    description: "Id do produto",
    type: String,
    required: true
  })
  id: string;

  @ApiProperty({
    description: "Nome do produto",
    type: String,
    required: true
  })
  name: string;

  @ApiProperty({
    description: "quantidade de entradas",
    type: String,
    required: true
  })
  total_entrance: number;

  @ApiProperty({
    description: "quantidade de saídas",
    type: String,
    required: true
  })
  total_exit: number;

  @ApiProperty({
    description: "quantidade em estoque",
    type: String,
    required: true
  })
  current_quantity: number;
}