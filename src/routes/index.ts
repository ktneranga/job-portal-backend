import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from './api/v1/users';
import authRouter from './api/v1/auth';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export class Routes {
    public apiPrefix: string = process.env.API_PREFIX as string;

    public routes(app: Application) {
        app.get('/health', (req: Request, res: Response) => res.status(200).send('Healthy!!!'));
        app.use(this.apiPrefix, userRouter);
        app.use(this.apiPrefix, authRouter);
    }
}
