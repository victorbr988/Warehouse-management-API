import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { SessionService } from "./session.service";
import { Response } from "express";
import { STATUS_CODES } from "http";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../../repository/dtos/user.dto";

@ApiTags('session') 
@Controller("session")
export class SessionController {
  private readonly sessionService: SessionService;
  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  @Post("create")
  @ApiOperation({ summary: 'Create a new session' }) 
  @ApiResponse({ status: 200, description: 'Session created successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async createSession(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { email, password } = userDto;
      const userId = await this.sessionService.createSession({ email, password });
      return res.status(200).json({ userId });
    } catch (error) {
      return res.status(400).json({ message: STATUS_CODES[400] });
    }
  }
}