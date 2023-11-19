import { PrismaClient } from './generated/client';

const prisma = new PrismaClient({});

const seedData = async () => {
    try {
        const teran = await prisma.user.upsert({
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

        const sapna = await prisma.user.upsert({
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
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};
seedData();
