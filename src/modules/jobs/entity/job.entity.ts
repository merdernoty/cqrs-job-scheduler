export type JobStatus = 'scheduled' | 'executing' | 'executed' | 'cancelled';

export interface Job {
  id: string;
  description: string;
  executeAt: Date;
  status: JobStatus;
  executedAt?: Date;
}
