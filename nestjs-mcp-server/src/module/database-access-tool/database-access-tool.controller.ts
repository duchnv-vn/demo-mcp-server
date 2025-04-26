import { Controller, Get, Ip, Post, Req, Res } from '@nestjs/common';
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
  async connectSSE(@Res() res: Response, @Ip() ip: string) {
    console.log('=== CONNECT SSE ===');
    console.log('ip:', ip);

    try {
      this.transport = new SSEServerTransport(
        '/database-access-tools/messages',
        res,
      );
      await this.databaseAccessToolService.mcpServerService.connect(
        this.transport,
      );
    } catch (error) {
      console.error(error);
      return res.send({ success: false });
    }
  }

  @Post('messages')
  async handleMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Ip() ip: string,
  ) {
    console.log('=== HANDLE MESSAGE ===');
    console.log('ip:', ip);
    console.log('body:', req.body);

    try {
      if (this.transport)
        await this.transport.handlePostMessage(req, res, req.body);
    } catch (error) {
      console.error(error);
      return res.send({ success: false });
    }
  }
}
