import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJobByIdQuery } from '../impl/get-job-by-id.query';
import { JobsService } from '../../jobs.service';
import { Job } from '../../entity/job.entity';

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
  constructor(private readonly jobsService: JobsService) {}

  async execute(query: GetJobByIdQuery): Promise<Job> {
    return this.jobsService.getJob(query.id);
  }
}
