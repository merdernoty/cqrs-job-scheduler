import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobCommand } from '../impl/create-job.command';
import { JobsService } from '../../jobs.service';
import { Job } from '../../entity/job.entity';

@CommandHandler(CreateJobCommand)
export class CreateJobHandler implements ICommandHandler<CreateJobCommand> {
  constructor(private readonly jobsService: JobsService) {}

  async execute(command: CreateJobCommand): Promise<Job> {
    const { description, executeAt } = command;
    return this.jobsService.createJob(description, executeAt);
  }
}
