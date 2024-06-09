import { Body, Controller, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { SessionService } from "./session.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SessionDto } from "src/repository/dtos/session.dto";
import { Response } from "express";
import { Public } from "src/utils/customDecorators/makePublicRoute";

@ApiTags('session') 
@Controller("session")
export class SessionController {
  private readonly sessionService: SessionService;
  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  @Public()
  @Post("create")
  @ApiOperation({ summary: 'Create a new session' }) 
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createSession(@Body() userDto: SessionDto, @Res({ passthrough: true }) res: Response) {
    const { email, password } = userDto;
    const accessToken = await this.sessionService.createSession({ email, password });

    res.cookie('token', accessToken, { 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 * 30, 
      sameSite: 'lax' 
    });
  }
}