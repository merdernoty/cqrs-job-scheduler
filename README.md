# Job Scheduler Service

This is a test project for a job scheduler service built with NestJS, implementing the CQRS pattern and utilizing Bull for background job management. The service allows scheduling, execution, and cancellation of jobs at specified future times.

## Features

- **Job Scheduling:** Create jobs that are executed in the future.
- **Job Cancellation:** Cancel a job if it hasn't been executed yet.
- **Force Execution:** Run a scheduled job immediately.
- **Status Tracking:** Monitor job statuses (scheduled, executing, executed, cancelled).
- **CQRS Pattern:** Separation of command and query responsibilities.
- **Bull Queue:** Robust background job processing with support for concurrency.

## Technologies

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript:** Typed superset of JavaScript.
- **CQRS:** Command Query Responsibility Segregation for clear separation of responsibilities.
- **Bull:** A Redis-based job queue for handling background tasks.
- **Redis:** In-memory data store used as a backend for Bull.
- **Docker & Docker Compose:** Containerization tools used to run Redis easily.

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm**
- **Docker & Docker Compose** (for running Redis)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/merdernoty/cqrs-job-scheduler.git
   cd cqrs-job-scheduler


2. **Install dependencies:**

   ```bash
   npm install

3. **Running Docker:**

   ```bash
   docker-compose up -d

4. **Running Application**

   ```bash
   npm run start:dev



## Testing with Insomnia
 You can import an Insomnia collection (exported in JSON format) to test all the API endpoints. Export your collection from Insomnia, and then use the Import feature in Insomnia to load the API requests.