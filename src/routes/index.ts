import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from './api/v1/users';
import authRouter from './api/v1/auth';

export class Routes {
    public routes(app: Application) {
        app.get('/health', (req: Request, res: Response) => res.status(200).send('Healthy!!!'));
        app.use('/api/v1', userRouter);
        app.use('/api/v1', authRouter);
    }
}
