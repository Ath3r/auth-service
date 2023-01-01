import httpStatus from 'http-status';
import { Response } from 'express';
class ResponseHandler {
  public static success(res: Response, data: any, message: string) {
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message,
      data,
    });
  }

  public static created(res: Response, data: any, message: string) {
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message,
      data,
    });
  }

  public static notFound(res: Response, message: string) {
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message,
    });
  }
}

export default ResponseHandler;
