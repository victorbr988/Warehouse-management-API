import { ApiProperty } from "@nestjs/swagger";
import { Entity } from "typeorm";
import { HistoryMovimentationType } from "../entity/history-movimentation.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

@Entity()
export class HistoryDto {
  @ApiProperty({
    description: "Tipo da movimentação",
    enum: HistoryMovimentationType,
    default: HistoryMovimentationType.NONE,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(HistoryMovimentationType)
  type: HistoryMovimentationType;

  
  @ApiProperty({
    description: "Id do produto",
    type: String,
    required: true
  })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: "Quantidade",
    type: Number,
    required: true
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: "Id do usuário",
    type: String,
    required: false
  })
  userId: string;
}

export class HistoryListDto {
  @ApiProperty({
    description: "Quantidade de items por página",
    type: Number,
    required: false
  })
  take: number;
  
  @ApiProperty({
    description: "Skip",
    type: Number,
    required: false
  })
  skip: number;
}