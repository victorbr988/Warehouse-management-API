import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    description: "Email do usuário cadastrado",
    type: String,
    required: true
  })
  email: string;

  @ApiProperty({
    description: "Email do usuário cadastrado",
    type: String,
    required: true
  })
  password: string;
}