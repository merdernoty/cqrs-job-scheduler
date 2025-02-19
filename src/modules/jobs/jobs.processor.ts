import { Processor, Process } from '@nestjs/bull';
import { Job as BullJob } from 'bull';
import { JobsService } from './jobs.service';

@Processor('jobs')
export class JobsProcessor {
  constructor(private jobsService: JobsService) {}

  @Process('execute')
  async handleExecute(bullJob: BullJob<{ id: string }>) {
    const jobId = bullJob.data.id;
    this.jobsService.updateJobStatus(jobId, 'executing');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.jobsService.updateJobStatus(jobId, 'executed', new Date());
  }
}
