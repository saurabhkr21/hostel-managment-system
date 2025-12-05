import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
            <p>Welcome, {session.user?.name} ({session.user?.role})</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">My Profile</h2>
                    <p className="text-gray-600">View and update your personal information.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Leave Request</h2>
                    <p className="text-gray-600">Apply for leave and check status.</p>
                </div>
            </div>
        </div>
    );
}
