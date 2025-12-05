import { authOptions } from './src/lib/auth'
import { CredentialsProvider } from 'next-auth/providers/credentials'
import { prisma } from './src/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    console.log('Testing authorize function...')
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET)

    // Extract the authorize function from the credentials provider
    const credentialsProvider = authOptions.providers.find(
        (p: any) => p.id === 'credentials' || p.name === 'Credentials'
    ) as any

    if (!credentialsProvider) {
        console.error('Credentials provider not found')
        return
    }
    console.log('Provider keys:', Object.keys(credentialsProvider))
    console.log('Has authorize:', typeof credentialsProvider.authorize)
    console.log('Authorize source:', credentialsProvider.authorize.toString())

    const credentials = {
        email: 'saurabh7221@gmail.com',
        password: '12345678'
    }

    try {
        // Direct query to check user existence
        const dbUser = await prisma.user.findUnique({
            where: { email: credentials.email }
        })
        console.log('DB User found:', dbUser ? 'Yes' : 'No')
        if (dbUser) {
            console.log('DB User Role:', dbUser.role)
            const match = await bcrypt.compare(credentials.password, dbUser.password)
            console.log('Password match check:', match)
        }

        const authorize = credentialsProvider.authorize && credentialsProvider.authorize.toString() !== '() => null'
            ? credentialsProvider.authorize
            : credentialsProvider.options.authorize

        console.log('Using authorize from:', credentialsProvider.authorize.toString() !== '() => null' ? 'root' : 'options')

        const user = await authorize(credentials)
        if (user) {
            console.log('Login successful:', user)
        } else {
            console.log('Login failed: Invalid credentials')
        }
    } catch (error) {
        console.error('Error during authorization:', error)
    }
}

main()
