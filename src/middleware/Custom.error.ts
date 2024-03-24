export interface ErrorDetails {
  [key: string]: any;
}

export default class CustomError extends Error {
  readonly status: number;
  readonly details: ErrorDetails;

  constructor(status: number, message: string, details?: ErrorDetails) {
    super(`Error: ${message} status: ${status}`);
    this.status = status;
    this.details = details || {};
  }

  static notFound(message: string, details?: ErrorDetails) {
    return new CustomError(404, message, details);
  }

  static badRequest(message: string, details?: ErrorDetails) {
    return new CustomError(400, message, details);
  }

  static conflict(message: string, details?: ErrorDetails) {
    return new CustomError(409, message, details);
  }

  static serverError(message: string, details?: ErrorDetails) {
    return new CustomError(500, message, details);
  }
}
