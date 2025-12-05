import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient({} as any)

async function main() {
    const email = 'saurabh7221@gmail.com'
    const password = await hash('12345678', 12)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password,
            role: Role.ADMIN,
        },
        create: {
            email,
            name: 'Saurabh Admin',
            password,
            role: Role.ADMIN,
        },
    })

    console.log('User created/updated:', user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
