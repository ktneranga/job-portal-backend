import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

export class AuthController {
    public static async register(req: Request, res: Response) {
        const { body } = req;
        const data = await authService.register(body);
        res.status(data.code as number).json(data.getResponse());
    }

    public static async login(req: Request, res: Response) {
        const { body } = req;
        const data = await authService.login(body);
        res.status(data.code as number).json(data.getResponse());
    }
}
