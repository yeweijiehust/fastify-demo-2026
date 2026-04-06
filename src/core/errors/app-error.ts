export interface AppErrorOptions {
  code: string;
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  code: string;
  statusCode: number;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = "AppError";
    this.code = options.code;
    this.statusCode = options.statusCode;
  }
}
