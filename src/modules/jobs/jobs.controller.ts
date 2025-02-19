import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Job } from './entity/job.entity';
import { CreateJobCommand } from './commands/impl/create-job.command';
import { GetJobsQuery } from './queries/impl/get-jobs.query';
import { GetJobByIdQuery } from './queries/impl/get-job-by-id.query';
import { CancelJobCommand } from './commands/impl/cancel-job.command';
import { ForceRunJobCommand } from './commands/impl/force-run-job.command';


@Controller('jobs')
export class JobsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createJob(@Body() body: { description: string; executeAt: string }): Promise<Job> {
    const executeAt = new Date(body.executeAt);
    return this.commandBus.execute(new CreateJobCommand(body.description, executeAt));
  }


  @Get()
  async getJobs(): Promise<Job[]> {
    return this.queryBus.execute(new GetJobsQuery());
  }

  @Get(':id')
  async getJob(@Param('id') id: string): Promise<Job> {
    return this.queryBus.execute(new GetJobByIdQuery(id));
  }

  @Delete(':id')
  async cancelJob(@Param('id') id: string): Promise<Job> {
    return this.commandBus.execute(new CancelJobCommand(id));
  }

  @Post(':id/run')
  async forceRunJob(@Param('id') id: string): Promise<Job> {
    return this.commandBus.execute(new ForceRunJobCommand(id));
  }
}
