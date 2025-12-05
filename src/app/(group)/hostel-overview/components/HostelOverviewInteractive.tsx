"use client";

import Icon from "@/components/ui/AppIcon";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OccupancyData {
  date: string;
  occupancy: number;
  capacity: number;
}

interface DepartmentData {
  name: string;
  students: number;
  color: string;
}

interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  message: string;
  timestamp: string;
}

const HostelOverviewInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      // Mock data - in production, fetch from API
      setOccupancyData([
        { date: "2024-01-01", occupancy: 85, capacity: 100 },
        { date: "2024-01-02", occupancy: 87, capacity: 100 },
        { date: "2024-01-03", occupancy: 89, capacity: 100 },
        { date: "2024-01-04", occupancy: 91, capacity: 100 },
        { date: "2024-01-05", occupancy: 88, capacity: 100 },
        { date: "2024-01-06", occupancy: 92, capacity: 100 },
        { date: "2024-01-07", occupancy: 90, capacity: 100 },
      ]);

      setDepartmentData([
        { name: "Computer Science", students: 85, color: "#3B82F6" },
        { name: "Electrical Eng.", students: 72, color: "#10B981" },
        { name: "Mechanical Eng.", students: 68, color: "#F59E0B" },
        { name: "Civil Eng.", students: 55, color: "#8B5CF6" },
        { name: "Business Admin.", students: 45, color: "#EF4444" },
      ]);

      setAlerts([
        {
          id: "1",
          type: "warning",
          message: "Room A-101 maintenance scheduled for tomorrow",
          timestamp: "2 hours ago",
        },
        {
          id: "2",
          type: "error",
          message: "3 students absent without notice",
          timestamp: "4 hours ago",
        },
        {
          id: "3",
          type: "info",
          message: "New semester registration opened",
          timestamp: "1 day ago",
        },
      ]);
    } catch (error) {
      console.error("Error fetching overview data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = departmentData.reduce(
    (sum, dept) => sum + dept.students,
    0
  );
  const currentOccupancy =
    occupancyData[occupancyData.length - 1]?.occupancy || 0;
  const totalCapacity = 100;

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <div className="flex-1 ml-0 md:ml-240">
            <div className="pt-16 md:pt-20 px-6 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="h-32 bg-muted rounded"></div>
                  <div className="h-32 bg-muted rounded"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="flex-1 ml-0 md:ml-240">
          <div className="pt-16 md:pt-20 px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Hostel Overview
              </h1>
              <p className="text-text-secondary">
                Comprehensive dashboard for hostel operations and management
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold text-text-primary">
                      {totalStudents}
                    </p>
                  </div>
                  <Icon
                    name="UserGroupIcon"
                    size={24}
                    className="text-primary"
                  />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">
                      Current Occupancy
                    </p>
                    <p className="text-2xl font-bold text-text-primary">
                      {currentOccupancy}%
                    </p>
                  </div>
                  <Icon name="HomeIcon" size={24} className="text-success" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">
                      Available Rooms
                    </p>
                    <p className="text-2xl font-bold text-text-primary">
                      {totalCapacity -
                        Math.round((totalCapacity * currentOccupancy) / 100)}
                    </p>
                  </div>
                  <Icon name="KeyIcon" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Occupancy Trend */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Occupancy Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="occupancy"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Department Distribution */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Department Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="students"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts and Notifications */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Recent Alerts
              </h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
                  >
                    <Icon
                      name={
                        alert.type === "warning"
                          ? "ExclamationTriangleIcon"
                          : alert.type === "error"
                          ? "XCircleIcon"
                          : "InformationCircleIcon"
                      }
                      size={20}
                      className={
                        alert.type === "warning"
                          ? "text-warning"
                          : alert.type === "error"
                          ? "text-destructive"
                          : "text-primary"
                      }
                    />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">
                        {alert.message}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelOverviewInteractive;
