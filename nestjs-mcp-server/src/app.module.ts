import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { McpServerModule } from '@service/mcp-server/mcp-server.module';
import { PrismaModule } from '@service/prisma/prisma.module';
import { DatabaseAccessToolModule } from '@module/database-access-tool/database-access-tool.module';

@Module({
  imports: [PrismaModule, McpServerModule, DatabaseAccessToolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
