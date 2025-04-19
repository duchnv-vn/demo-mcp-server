import { Injectable, OnModuleInit } from '@nestjs/common';
import { RegisteredTool } from '@modelcontextprotocol/sdk/server/mcp';
import { Project } from '@prisma/client';
import { z } from 'zod';
import { McpServerService } from '@service/mcp-server/mcp-server.service';
import { PrismaService } from '@service/prisma/prisma.service';

@Injectable()
export class DatabaseAccessToolService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mcpServerService: McpServerService,
  ) {}

  onModuleInit() {
    this.initGetProjectsTool();
  }

  initGetProjectsTool(): RegisteredTool {
    return this.mcpServerService.tool(
      'get-projects',
      'Retrieve multiple projects with filters',
      {
        name: z.string().optional(),
      },
      async ({ name }) => {
        let isError = false;

        let projects = [] as Project[];

        try {
          projects = await this.prisma.project.findMany({
            where: { name: { contains: name } },
          });
        } catch (error) {
          isError = true;
        }

        return {
          isError,
          content: [{ type: 'text', text: JSON.stringify(projects) }],
        };
      },
    );
  }
}
