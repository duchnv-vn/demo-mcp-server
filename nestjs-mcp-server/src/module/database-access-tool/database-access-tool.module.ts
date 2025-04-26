import { Module } from '@nestjs/common';
import { DatabaseAccessToolService } from './database-access-tool.service';
import { McpServerModule } from '@service/mcp-server/mcp-server.module';
import { DatabaseAccessToolController } from './database-access-tool.controller';

@Module({
  imports: [McpServerModule],
  providers: [DatabaseAccessToolService],
  controllers: [DatabaseAccessToolController],
})
export class DatabaseAccessToolModule {}
