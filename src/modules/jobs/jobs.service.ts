import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Job } from './entity/job.entity';

@Injectable()
export class JobsService {
  private jobs = new Map<string, Job>(); // TODO: replace with a database

  constructor(@InjectQueue('jobs') private jobQueue: Queue) {}

  // Создание задачи
  async createJob(description: string, executeAt: Date): Promise<Job> {
    if (executeAt.getTime() <= Date.now()) {
      throw new BadRequestException('executeAt must be in the future');
    }

    const job: Job = {
      id: uuidv4(),
      description,
      executeAt,
      status: 'scheduled',
    };

    this.jobs.set(job.id, job);
    const delay = executeAt.getTime() - Date.now();
    await this.jobQueue.add('execute', { id: job.id }, { delay });

    return job;
  }

  // Получение задачи по айди
  getJob(id: string): Job {
    const job = this.jobs.get(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

// Получение всех задач
  getJobs(): Job[] {
    return Array.from(this.jobs.values());
  }


// Отмена задачи
  cancelJob(id: string): Job {
    const job = this.jobs.get(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.status !== 'scheduled') {
      throw new BadRequestException('Job cannot be cancelled');
    }
    job.status = 'cancelled';
    return job;
  }

  // Принудительный запуск задачи (без задержки)
  async forceRunJob(id: string): Promise<Job> {
    const job = this.jobs.get(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.status !== 'scheduled') {
      throw new BadRequestException(
        'Job already executed, executing or cancelled',
      );
    }
    await this.jobQueue.add('execute', { id: job.id }, { delay: 0 });
    return job;
  }

  // Метод для обновления статуса задачи, вызываемый в процессоре
  updateJobStatus(
    id: string,
    status: 'executing' | 'executed',
    executedAt?: Date,
  ) {
    const job = this.jobs.get(id);
    if (job) {
      job.status = status;
      if (executedAt) {
        job.executedAt = executedAt;
      }
    }
  }
}
