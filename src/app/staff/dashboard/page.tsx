import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StaffDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
            <p>Welcome, {session.user?.name} ({session.user?.role})</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Attendance</h2>
                    <p className="text-gray-600">Mark and view student attendance.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Complaints</h2>
                    <p className="text-gray-600">Review and resolve student complaints.</p>
                </div>
            </div>
        </div>
    );
}
