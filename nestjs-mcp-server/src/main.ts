import { NestFactory } from '@nestjs/core';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { AppModule } from './app.module';
import { McpServerService } from '@service/mcp-server/mcp-server.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort = process.env?.APP_PORT || 3000;
  await app.listen(appPort).then(() => {
    console.log(`========= App is listening on port ${appPort} =========`);
  });

  const mcpServer = app.get(McpServerService);
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
}
bootstrap();
