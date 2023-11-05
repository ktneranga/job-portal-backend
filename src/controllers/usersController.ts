import { Application, Request, Response, NextFunction } from 'express';
import userService from '../services/usersService';

export class UserController {
    public static async getUser(req: Request, res: Response) {
        const { id } = req.query;
        const data = await userService.getUser(id as string);
        res.status(data.code as number).json(data.getResponse());
    }

    public static async getUsers(req: Request, res: Response) {
        const data = await userService.getUsers();
        res.status(data.code as number).json(data.getResponse());
    }

    public static async createUser(req: Request, res: Response) {
        const { body } = req;
        const data = await userService.createUser(body);
        res.status(data.code as number).json(data.getResponse());
    }
}
