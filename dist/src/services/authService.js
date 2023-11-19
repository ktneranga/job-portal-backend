"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const commonResponse_1 = require("../utils/commonResponse");
const client_1 = require("@prisma/client");
const jwt_1 = __importDefault(require("../utils/jwt"));
const prisma = new client_1.PrismaClient({});
class AuthService {
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const cr = new commonResponse_1.CommonResponse();
            const { firstName, lastName, email, password, role, isActive } = body;
            const _isActive = isActive === '1';
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                //check user already exist
                const user = yield prisma.user.findUnique({
                    where: { email },
                });
                if (user) {
                    throw new Error('User already exist!');
                }
                const newUser = yield prisma.user.create({
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
            }
            catch (error) {
                console.log(error);
                cr.setStatus(false);
                cr.setCode(500);
                cr.setMessage(error.message);
                cr.setError(error);
            }
            return cr;
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const cr = new commonResponse_1.CommonResponse();
            const { email, password } = body;
            try {
                const user = yield prisma.user.findUnique({ where: { email } });
                if (!user) {
                    throw new Error('User not found!');
                }
                //check whether the password match
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error('Passwords are not matched!');
                }
                function exclude(user, keys) {
                    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
                }
                const userWithoutPassword = exclude(user, ['password']);
                //assign Token
                const token = jwt_1.default.assignToken(userWithoutPassword);
                const data = { token };
                cr.setStatus(true);
                cr.setCode(200);
                cr.setData(data);
                cr.setMessage('User loggedin successfully!');
            }
            catch (error) {
                console.log(error);
                cr.setStatus(false);
                cr.setCode(500);
                cr.setMessage(error.message);
                cr.setError(error);
            }
            return cr;
        });
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
