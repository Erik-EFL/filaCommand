import errorMiddleware from '../../middleware/Middleware.error';

describe('errorMiddleware', () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  it('should send error response with status, message, and details', async () => {
    const err = {
      status: 404,
      message: 'Not Found',
      details: { resource: 'User' },
    };
    const req: any = {};
    const res = mockResponse();

    await errorMiddleware(err, req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(err.status);
    expect(res.send).toHaveBeenCalledWith({ message: err.message });
    expect(res.json).toHaveBeenCalledWith({ status: err.status, message: err.message, details: err.details });
    expect(mockNext).toHaveBeenCalled();
  });

  it('should send default error response if message is not provided', async () => {
    const err = {
      status: 500,
    };
    const req: any = {};
    const res = mockResponse();

    await errorMiddleware(err, req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(err.status);
    expect(res.send).toHaveBeenCalledWith({ message: 'An error occurred' });
    expect(res.json).toHaveBeenCalledWith({ status: err.status, message: undefined, details: undefined });
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next middleware with sendError if an error occurs while sending response', async () => {
    const err = {
      status: 400,
      message: 'Bad Request',
    };
    const req: any = {};
    const res = mockResponse();
    const sendError = new Error('Error sending response');

    res.send.mockImplementation(() => {
      throw sendError;
    });

    await errorMiddleware(err, req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(sendError);
  });
});
