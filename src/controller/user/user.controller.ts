import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "src/repository/dtos/user.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post()
  public async createUser(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { email, password, name } = userDto;  
      await this.userService.createUser({ email, password, name });
      
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}