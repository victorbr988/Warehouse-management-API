import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "src/repository/dtos/user.dto";
import { Response } from "express";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/utils/customDecorators/makePublicRoute";

@ApiTags("user")
@Controller("user")
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Public()
  @Post("create")
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async createUser(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { email, password, name } = userDto;  
      await this.userService.createUser({ email, password, name });
      
      return res.status(HttpStatus.CREATED).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get("logged")
  @ApiResponse({ status: 200, description: 'User logged successfully' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async getUserLogged(@Req() req: any, @Res() res: Response) {
    try {
      const { email } = req.user;
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new NotFoundException();
      }

      return res.status(HttpStatus.OK).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}