import { Body, Controller, Get, HttpStatus, Inject, Post, Put, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { HistoryDto, HistoryListDto } from "src/repository/dtos/history.dto";
import { HistoryService } from "./history.service";

@ApiTags("history")
@Controller("history")
export class HistoryController {
  private readonly historyService: HistoryService;
  
  constructor(historyService: HistoryService) {
    this.historyService = historyService;
  }

  @Get("list")
  public async getHistory(@Query() historyListDto: HistoryListDto, @Res() res: Response) {
    try {
      const { take, skip } = historyListDto;
      const history = await this.historyService.getHistory({ take, skip });
      
      return res.status(HttpStatus.OK).json(history);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  @Post("create")
  public async createHistory(@Body() historyDto: HistoryDto, @Req() req: any, @Res() res: Response) {
    try {
      const { email } = req.user
      const { type, quantity, productId } = historyDto;
      const history = await this.historyService.createHistory({ type, quantity, productId, email });

      return res.status(HttpStatus.CREATED).json({ message: "History successfully created", history });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}