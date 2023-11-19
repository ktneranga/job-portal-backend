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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const commonResponse_1 = require("../utils/commonResponse");
const prisma = new client_1.PrismaClient();
class UserService {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cr = new commonResponse_1.CommonResponse();
            try {
                const response = yield prisma.user.findUnique({
                    where: {
                        id: parseInt(id),
                    },
                });
                cr.setStatus(true);
                cr.setCode(200);
                cr.setData(response);
            }
            catch (error) {
                cr.setStatus(false);
                cr.setCode(500);
                cr.setMessage(error.message);
                cr.setError(error);
            }
            return cr;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const cr = new commonResponse_1.CommonResponse();
            try {
                const response = yield prisma.user.findMany();
                cr.setStatus(true);
                cr.setCode(200);
                cr.setData(response);
            }
            catch (error) {
                cr.setStatus(false);
                cr.setCode(500);
                cr.setMessage(error.message);
                cr.setError(error);
            }
            return cr;
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const cr = new commonResponse_1.CommonResponse();
            const { firstName, lastName, email, password, role, isActive } = body;
            const _isActive = isActive === '1';
            try {
                const user = yield prisma.user.findUnique({
                    where: { email },
                });
                if (user) {
                    throw new Error('User already exist');
                }
                const newUser = yield prisma.user.create({
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
            }
            catch (error) {
                cr.setStatus(false);
                cr.setCode(500);
                cr.setMessage(error.message);
                cr.setError(error);
            }
            return cr;
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService();
