import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">401 - Unauthorized</h1>
            <p className="text-xl text-gray-700 mb-8">You do not have permission to access this page.</p>
            <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Login
            </Link>
        </div>
    );
}
