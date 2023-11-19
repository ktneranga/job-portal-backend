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
const client_1 = require("./generated/client");
const prisma = new client_1.PrismaClient({});
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teran = yield prisma.user.upsert({
            where: {
                email: 'teran.neranga@gmail.com',
            },
            update: {},
            create: {
                email: 'teran.neranga@gmail.com',
                firstName: 'Teran',
                lastName: 'Neranga',
                password: '12345678',
                role: 'USER',
                isActive: true,
            },
        });
        const sapna = yield prisma.user.upsert({
            where: {
                email: 'sapna.madurangi@gmail.com',
            },
            update: {},
            create: {
                email: 'sapna.madurangi@gmail.com',
                firstName: 'Sapna   ',
                lastName: 'Madurangi',
                password: '12345678',
                role: 'USER',
                isActive: true,
            },
        });
        console.log(teran, sapna);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
seedData();
