import bcrypt from 'bcrypt';
import { CommonResponse } from '../utils/commonResponse';
import { PrismaClient } from '@prisma/client';
import jwt from '../utils/jwt';
import { exclude } from '../utils/exclude';

const prisma = new PrismaClient({});

interface IRegisterUserRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
    isActive: string;
}

interface ILoginUserRequestModel {
    email: string;
    password: string;
}

export class AuthService {
    public async register(body: IRegisterUserRequestModel): Promise<CommonResponse> {
        const cr: CommonResponse = new CommonResponse();

        const { firstName, lastName, email, password, role, isActive } = body;

        const _isActive = isActive === '1';

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //check user already exist
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (user) {
                throw new Error('User already exist!');
            }

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role,
                    isActive: _isActive,
                },
            });

            if (!newUser) {
                throw new Error('User registration failed!');
            }

            cr.setStatus(true);
            cr.setCode(200);
            cr.setData(newUser);
            cr.setMessage('User registered successfully!');
        } catch (error: any) {
            console.log(error);
            cr.setStatus(false);
            cr.setCode(500);
            cr.setMessage(error.message);
            cr.setError(error);
        }

        return cr;
    }

    public async login(body: ILoginUserRequestModel): Promise<CommonResponse> {
        const cr: CommonResponse = new CommonResponse();

        const { email, password } = body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                throw new Error('User not found!');
            }

            //check whether the password match
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('Passwords are not matched!');
            }

            const userWithoutPassword = exclude(user, ['password']);

            //assign Token
            const token: string = jwt.assignToken(userWithoutPassword);

            const data = { token };

            cr.setStatus(true);
            cr.setCode(200);
            cr.setData(data);
            cr.setMessage('User loggedin successfully!');
        } catch (error: any) {
            console.log(error);
            cr.setStatus(false);
            cr.setCode(500);
            cr.setMessage(error.message);
            cr.setError(error);
        }
        return cr;
    }
}

export default new AuthService();
