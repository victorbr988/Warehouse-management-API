import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get()
  getHello(@Res() response: Response): Response {
    const appMessage = this.appService.getHello();

    return response.json({
      message: appMessage,
    });
  }
}
