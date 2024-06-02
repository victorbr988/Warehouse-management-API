import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
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
  @ApiResponse({ status: 200, description: 'Session created successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async createSession(@Body() userDto: SessionDto, @Res({ passthrough: true }) res: Response) {
    try{
      const { email, password } = userDto;
      const accessToken = await this.sessionService.createSession({ email, password });

      res.cookie('token', accessToken, { 
        httpOnly: true, 
        maxAge: 60 * 60 * 24 * 30, 
        sameSite: 'lax' 
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}