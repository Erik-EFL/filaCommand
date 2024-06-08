import { ErrorRequestHandler } from 'express';

/**
 * Express error handling middleware.
 *
 * @param err The error object being passed to the middleware.
 * @param _req The request object.
 * @param res The response object.
 * @param next The next middleware function in the stack.
 */
const errorMiddleware: ErrorRequestHandler = async (err, _req, res, next) => {
  const { status, message, details } = err;

  try {
    res.status(status).send({ message: message || 'An error occurred' }).json({ status, message, details });
    next();
  } catch (sendError) {
    next(sendError);
  }
};

export default errorMiddleware;
