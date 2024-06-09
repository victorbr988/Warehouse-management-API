import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SessionDto {
  @ApiProperty({
    description: "Email do usuário",
    type: String,
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    type: String,
    required: true
  })
  @IsNotEmpty()
  password: string;
}