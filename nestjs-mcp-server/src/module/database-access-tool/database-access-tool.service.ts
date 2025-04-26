import { Injectable, OnModuleInit } from '@nestjs/common';
import { Project } from '@prisma/client';
import { z } from 'zod';
import { McpServerService } from '@service/mcp-server/mcp-server.service';
import { PrismaService } from '@service/prisma/prisma.service';

@Injectable()
export class DatabaseAccessToolService implements OnModuleInit {
  mcpServerService!: McpServerService;

  constructor(private readonly prisma: PrismaService) {
    this.mcpServerService = new McpServerService({
      name: 'database-access-tools',
      version: '1.0.0',
    });
  }

  onModuleInit() {
    this.initGetProjectsTool();
  }

  initGetProjectsTool() {
    this.mcpServerService.tool(
      'get-projects',
      'Retrieve multiple projects with filters',
      {
        name: z.string().optional(),
      },
      async ({ name }) => {
        console.log('initGetProjectsTool', name);

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
