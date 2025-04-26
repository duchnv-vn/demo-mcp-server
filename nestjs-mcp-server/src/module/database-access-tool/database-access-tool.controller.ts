import { Controller, Get } from '@nestjs/common';
import { McpServerService } from '@service/mcp-server/mcp-server.service';

@Controller('database-access-tool')
export class DatabaseAccessToolController {
  constructor(private readonly mcpServerService: McpServerService) {}
  @Get('sse')
  connectSSE() {}
}
