import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Injectable } from '@nestjs/common';

@Injectable()
export class McpServerService extends McpServer {
  constructor() {
    super({
      name: process.env?.MCP_SERVER_NAME || 'myMcpServer',
      version: process.env?.MCP_SERVER_VERSION || '1.0.0',
    });
  }
}
