import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateJobHandler } from './commands/handlers/create-job.handler';
import { CancelJobHandler } from './commands/handlers/cancel-job.handler';
import { ForceRunJobHandler } from './commands/handlers/force-run-job.handler';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { GetJobsHandler } from './queries/handlers/get-jobs.handler';
import { GetJobByIdHandler } from './queries/handlers/get-job-by-id.handler';
import { BullModule } from '@nestjs/bull';
import { JobsProcessor } from './jobs.processor';

export const CommandHandlers = [
  CreateJobHandler,
  CancelJobHandler,
  ForceRunJobHandler,
];
export const QueryHandlers = [GetJobsHandler, GetJobByIdHandler];

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({
      name: 'jobs',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, JobsProcessor, ...CommandHandlers, ...QueryHandlers],
})
export class JobsModule {}
