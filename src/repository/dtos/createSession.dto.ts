import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionDto {
  @ApiProperty({
    description: "Email do usuário cadastrado",
    type: String,
    required: true
  })
  email: string;
}