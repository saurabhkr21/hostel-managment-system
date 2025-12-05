"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Block A", occupied: 40, capacity: 60 },
    { name: "Block B", occupied: 30, capacity: 50 },
    { name: "Block C", occupied: 20, capacity: 40 },
    { name: "Block D", occupied: 27, capacity: 30 },
    { name: "Block E", occupied: 18, capacity: 20 },
];

export default function OccupancyChart() {
    return (
        <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                Hostel Occupancy
            </h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="occupied" fill="#4f46e5" name="Occupied" />
                        <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
