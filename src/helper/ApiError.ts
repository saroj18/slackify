import { ZodError } from "zod";

export class ApiError extends Error {
  private statusCode: number;

  constructor(message: string, status?: number) {
    super(message);
    this.statusCode = status || 500;
  }
}
