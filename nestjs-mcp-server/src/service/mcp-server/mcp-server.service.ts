import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export class McpServerService extends McpServer {
  constructor(config: { name: string; version: string }) {
    super(config, { capabilities: { tools: {}, logging: {} } });
  }
}
