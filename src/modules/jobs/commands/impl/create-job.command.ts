export class CreateJobCommand {
  constructor(
    public readonly description: string,
    public readonly executeAt: Date,
  ) {}
}
