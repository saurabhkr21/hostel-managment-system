"use client";

import { useSession } from "next-auth/react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
            <div className="flex items-center">
                {/* Breadcrumb or Page Title placeholder */}
                <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-700">
                            {session?.user?.name || "Admin User"}
                        </span>
                        <span className="text-xs text-gray-500">
                            {session?.user?.role || "ADMIN"}
                        </span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        {session?.user?.name?.[0] || "A"}
                    </div>
                </div>
            </div>
        </header>
    );
}
