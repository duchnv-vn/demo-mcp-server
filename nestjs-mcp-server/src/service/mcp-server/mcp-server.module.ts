import { Module } from '@nestjs/common';
import { McpServerService } from './mcp-server.service';

@Module({ providers: [McpServerService], exports: [McpServerService] })
export class McpServerModule {}
