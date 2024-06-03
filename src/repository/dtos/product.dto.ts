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