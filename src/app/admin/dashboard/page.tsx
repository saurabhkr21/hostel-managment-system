import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StatsCard from "@/components/admin/StatsCard";
import OccupancyChart from "@/components/admin/OccupancyChart";
import RecentActivity from "@/components/admin/RecentActivity";
import {
    UserGroupIcon,
    UsersIcon,
    BuildingOfficeIcon,
    CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const stats = [
        {
            name: "Total Students",
            value: "120",
            icon: UserGroupIcon,
            change: "12%",
            changeType: "increase" as const,
        },
        {
            name: "Total Staff",
            value: "15",
            icon: UsersIcon,
            change: "2%",
            changeType: "increase" as const,
        },
        {
            name: "Rooms Occupied",
            value: "85%",
            icon: BuildingOfficeIcon,
            change: "5%",
            changeType: "decrease" as const,
        },
        {
            name: "Pending Fees",
            value: "₹ 45,000",
            icon: CurrencyRupeeIcon,
            change: "8%",
            changeType: "decrease" as const,
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600">
                    Welcome back, {session.user?.name}. Here's what's happening today.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <StatsCard key={item.name} {...item} />
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <OccupancyChart />
                <RecentActivity />
            </div>
        </div>
    );
}
