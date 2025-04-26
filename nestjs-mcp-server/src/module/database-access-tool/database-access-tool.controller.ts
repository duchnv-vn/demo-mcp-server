import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { McpServerService } from '@service/mcp-server/mcp-server.service';

@Controller('database-access-tool')
export class DatabaseAccessToolController {
  transport!: SSEServerTransport;

  constructor(private readonly mcpServerService: McpServerService) {}

  @Get('sse')
  connectSSE(@Res() res: Response) {
    try {
      this.transport = new SSEServerTransport('/messages', res);
      this.mcpServerService.connect(this.transport);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  @Post('messages')
  handleMessage(@Req() req: Request, @Res() res: Response) {
    try {
      if (this.transport) this.transport.handlePostMessage(req, res);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
