export interface ErrorDetails {
  [key: string]: any;
}

/**
 * Represents a custom error class that extends the built-in Error class.
 * Provides additional properties for status code and error details.
 * Includes static methods for common HTTP error statuses.
 */
export default class CustomError extends Error {
  status: number | undefined;
  details: ErrorDetails;

  constructor(status: number | undefined, message: string, details?: ErrorDetails) {
    super(`Error: ${message} | Error Status Code: ${status}`);
    this.status = status;
    this.details = details || {};
  }

  static custonError(status: number, message: string, details?: ErrorDetails) {
    return new CustomError(status, message, details);
  }

  toJSON() {
    return {
      status: this.status,
      details: this.details,
      message: this.message
    };
  }
}
