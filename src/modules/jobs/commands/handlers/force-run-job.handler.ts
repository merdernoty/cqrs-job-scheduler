import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForceRunJobCommand } from '../impl/force-run-job.command';
import { JobsService } from '../../jobs.service';
import { Job } from '../../entity/job.entity';

@CommandHandler(ForceRunJobCommand)
export class ForceRunJobHandler implements ICommandHandler<ForceRunJobCommand> {
  constructor(private readonly jobsService: JobsService) {}

  async execute(command: ForceRunJobCommand): Promise<Job> {
    return this.jobsService.forceRunJob(command.id);
  }
}
