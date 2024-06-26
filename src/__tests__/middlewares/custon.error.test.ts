// Generated by CodiumAI

import CustomError from "../../middleware/Custom.error";

describe('CustomError', () => {

  // Creating an instance with status, message, and details
  it('should create an instance with status, message, and details', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual(details);
  });

  // Creating an instance with undefined status
  it('should create an instance with undefined status', () => {
    const status = undefined;
    const message = 'Unknown Error';

    const error = new CustomError(status, message);

    expect(error.status).toBeUndefined();
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual({});
  });

  // Creating an instance with status and message only
  it('should create an instance with status and message only', () => {
    const status = 404;
    const message = 'Not Found';

    const error = new CustomError(status, message);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual({});
  });

  // Using the static method to create an instance
  it('should create an instance using the static method', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = CustomError.custonError(status, message, details);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual(details);
  });

  // Converting an instance to JSON format
  it('should convert an instance to JSON format', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);
    const jsonError = error.toJSON();

    expect(jsonError.status).toBe(status);
    expect(jsonError.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(jsonError.details).toEqual(details);
  });

  // Checking if the message includes status and error message
  it('should include status and error message in the message', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);

    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
  });

  // Creating an instance with an empty message
  it('should create an instance with an empty message', () => {
    const status = undefined;
    const message = '';

    const error = new CustomError(status, message);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual({});
  });

  // Creating an instance with undefined details
  it('should create an instance with undefined details', () => {
    const status = undefined;
    const message = 'Internal Server Error';

    const error = new CustomError(status, message);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual({});
  });

  // Using the static method with undefined details
  it('should create an instance with status, message, and empty details', () => {
    const status = 404;
    const message = 'Not Found';

    const error = CustomError.custonError(status, message);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual({});
  });

  // Verifying the inheritance from Error class
  it('should inherit from Error class when creating an instance', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);

    expect(error instanceof Error).toBe(true);
  });

  // Testing the handling of non-object details with the updated assertion
  it('should handle non-object details - Updated', () => {
    const status = 400;
    const message = 'Bad Request';
    const details = {message:'Invalid input'};

    const error = new CustomError(status, message, details);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual(details);
  });

  // Ensuring the status property is correctly assigned
  it('should assign status property correctly when creating an instance', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);

    expect(error.status).toBe(status);
  });

  // Ensuring the details property defaults to an empty object
  it('should ensure details property defaults to an empty object', () => {
    const status = 500;
    const message = 'Internal Server Error';

    const error = new CustomError(status, message);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual({});
  });

  // Checking if the toJSON method includes all properties
  it('should include all properties in toJSON method', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);

    const jsonOutput = error.toJSON();

    expect(jsonOutput.status).toBe(status);
    expect(jsonOutput.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(jsonOutput.details).toEqual(details);
  });

  // Validating the error message format
  it('should validate error message format when creating a new instance', () => {
    const status = 404;
    const message = 'Not Found';
    const details = { resource: 'User' };

    const error = new CustomError(status, message, details);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`Error: ${message} | Error Status Code: ${status}`);
    expect(error.details).toEqual(details);
  });
});
