
import { PrismaClient } from './src/generated/client/client'

async function main() {
    try {
        console.log('Attempting to instantiate PrismaClient...')
        // @ts-ignore
        const prisma = new PrismaClient()
        console.log('PrismaClient instantiated successfully.')
        // await prisma.$connect()
    } catch (e: any) {
        console.error('Error Message:', e.message)
        process.exit(1)
    }
}

main()
