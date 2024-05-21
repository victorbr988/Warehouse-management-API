import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { SessionService } from "./session.service";
import { Response } from "express";
import { STATUS_CODES } from "http";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSessionDto } from "../../repository/dtos/createSession.dto";

@ApiTags('session') 
@Controller("session")
export class SessionController {
  private readonly sessionService: SessionService;
  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  @Post("create")
  @ApiOperation({ summary: 'Create a new session' })  // Descreve a operação
  @ApiResponse({ status: 200, description: 'Session created successfully.' })  // Descreve a resposta de sucesso
  @ApiResponse({ status: 404, description: 'Not Found' })  // Descreve a resposta de erro
  async createSession(@Body() createSessionDto: CreateSessionDto, @Res() res: Response) {
    const { email } = createSessionDto;
    console.log(email);
    const userId = await this.sessionService.createSession({ email });
    if (!userId) {
      return res.status(400).json({ message: STATUS_CODES[404] });
    }
    return res.status(200).json({ userId });
  }
}