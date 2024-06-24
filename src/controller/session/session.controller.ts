import { Body, Controller, Post, Res } from "@nestjs/common";
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
  async createSession(@Body() sessionDto: SessionDto, @Res() res: Response) {
    const { email, password } = sessionDto;
    const accessToken = await this.sessionService.createSession({ email, password });

    return res.status(201).cookie('token', accessToken, { 
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: 'www.vm.semeatech.com.br',
      path: "/",
      sameSite: "lax",
    }).json({ message: "Session created successfully" });
  }
}