import { Request, Response, NextFunction } from 'express';
import { CommonResponse } from '../utils/commonResponse';

const cr = new CommonResponse();

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errStatus = (err as any).statusCode || 500;
    const errMessage = err.message || 'Something went wrong';
};
