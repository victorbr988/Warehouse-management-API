import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: "Email do usuário",
    type: String,
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    type: String,
    required: true
  })
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({
    description: "Nome do usuário",
    type: String,
    required: true
  })
  @IsNotEmpty()
  name: string;
}