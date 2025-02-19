import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJobsQuery } from '../impl/get-jobs.query';
import { JobsService } from '../../jobs.service';
import { Job } from '../../entity/job.entity';

@QueryHandler(GetJobsQuery)
export class GetJobsHandler implements IQueryHandler<GetJobsQuery> {
  constructor(private readonly jobsService: JobsService) {}

  async execute(query: GetJobsQuery): Promise<Job[]> {
    return this.jobsService.getJobs();
  }
}