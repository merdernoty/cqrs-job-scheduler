import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelJobCommand } from '../impl/cancel-job.command';
import { JobsService } from '../../jobs.service';
import { Job } from '../../entity/job.entity';

@CommandHandler(CancelJobCommand)
export class CancelJobHandler implements ICommandHandler<CancelJobCommand> {
  constructor(private readonly jobsService: JobsService) {}

  async execute(command: CancelJobCommand): Promise<Job> {
    return this.jobsService.cancelJob(command.id);
  }
}