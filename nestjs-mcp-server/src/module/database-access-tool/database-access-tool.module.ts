import { Module } from '@nestjs/common';
import { DatabaseAccessToolService } from './database-access-tool.service';
import { DatabaseAccessToolController } from './database-access-tool.controller';

@Module({
  providers: [DatabaseAccessToolService],
  controllers: [DatabaseAccessToolController],
})
export class DatabaseAccessToolModule {}
