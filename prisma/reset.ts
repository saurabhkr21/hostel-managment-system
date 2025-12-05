import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({} as any)

async function main() {
    console.log('Resetting database...')

    // Delete in order of dependencies (though MongoDB doesn't enforce FKs, it's good practice)
    await prisma.attendance.deleteMany({})
    await prisma.leaveRecord.deleteMany({})
    await prisma.activity.deleteMany({})
    await prisma.parentCommunication.deleteMany({})
    await prisma.hostelAlert.deleteMany({})

    // Delete main entities
    await prisma.student.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.department.deleteMany({})

    console.log('Database reset completed.')
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
