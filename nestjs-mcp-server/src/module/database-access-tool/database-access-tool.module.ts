import { Module } from '@nestjs/common';
import { DatabaseAccessToolService } from './database-access-tool.service';
import { McpServerModule } from '@service/mcp-server/mcp-server.module';

@Module({
  imports: [McpServerModule],
  providers: [DatabaseAccessToolService],
})
export class DatabaseAccessToolModule {}
