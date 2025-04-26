import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { DatabaseAccessToolService } from './database-access-tool.service';

@Controller('database-access-tools')
export class DatabaseAccessToolController {
  transport!: SSEServerTransport;

  constructor(
    private readonly databaseAccessToolService: DatabaseAccessToolService,
  ) {}

  @Get('sse')
  connectSSE(@Res() res: Response) {
    try {
      this.transport = new SSEServerTransport(
        '/database-access-tools/messages',
        res,
      );
      this.databaseAccessToolService.mcpServerService.connect(this.transport);
    } catch (error) {
      console.error(error);
      return res.send({ success: false });
    }
  }

  @Post('messages')
  handleMessage(@Req() req: Request, @Res() res: Response) {
    try {
      if (this.transport) this.transport.handlePostMessage(req, res);
    } catch (error) {
      console.error(error);
      return res.send({ success: false });
    }
  }
}
