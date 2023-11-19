import { PrismaClient } from '../../prisma/generated/client';
import { CommonResponse } from '../utils/commonResponse';

const prisma = new PrismaClient();

interface IUserService {
    getUser(id: string): Promise<CommonResponse>;
    getUsers(): Promise<CommonResponse>;
    createUser(body: IUserRequestModel): Promise<CommonResponse>;
}

interface IUserRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'USER' | 'ADMIN';
    isActive: string;
}

export class UserService implements IUserService {
    public async getUser(id: string): Promise<CommonResponse> {
        const cr = new CommonResponse();

        try {
            const response = await prisma.user.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            cr.setStatus(true);
            cr.setCode(200);
            cr.setData(response);
        } catch (error: any) {
            cr.setStatus(false);
            cr.setCode(500);
            cr.setMessage(error.message);
            cr.setError(error);
        }
        return cr;
    }

    public async getUsers(): Promise<CommonResponse> {
        const cr = new CommonResponse();
        try {
            const response = await prisma.user.findMany();
            cr.setStatus(true);
            cr.setCode(200);
            cr.setData(response);
        } catch (error: any) {
            cr.setStatus(false);
            cr.setCode(500);
            cr.setMessage(error.message);
            cr.setError(error);
        }
        return cr;
    }

    public async createUser(body: IUserRequestModel): Promise<CommonResponse> {
        const cr = new CommonResponse();

        const { firstName, lastName, email, password, role, isActive } = body;
        const _isActive = isActive === '1';

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (user) {
                throw new Error('User already exist');
            }

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                    isActive: _isActive,
                },
            });

            if (!newUser) {
                throw new Error('User creation failed!');
            }

            cr.setStatus(true);
            cr.setCode(200);
            cr.setData(newUser);
        } catch (error: any) {
            cr.setStatus(false);
            cr.setCode(500);
            cr.setMessage(error.message);
            cr.setError(error);
        }
        return cr;
    }
}

export default new UserService();
