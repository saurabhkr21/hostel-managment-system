'use client';

import React, { useState, useEffect } from 'react';
import MetricsCard from './MetricsCard';
import QuickActionButton from './QuickActionButton';
import ActivityTab from './ActivityTab';
import AttendanceChart from './AttendanceChart';
import DepartmentBreakdown from './DepartmentBreakdown';
import CriticalAlerts from './CriticalAlerts';

interface Activity {
  id: string;
  type: 'attendance' | 'leave' | 'notification' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  priority?: 'low' | 'medium' | 'high';
  student?: string;
}

interface Alert {
  id: string;
  type: 'attendance' | 'leave' | 'emergency' | 'system';
  title: string;
  description: string;
  studentName?: string;
  studentId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  actionRequired: boolean;
}

interface ChartData {
  day: string;
  attendance: number;
  activities: number;
}

interface Department {
  id: string;
  name: string;
  totalStudents: number;
  presentStudents: number;
  attendanceRate: number;
  color: string;
}

const AdminDashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock data
  const metricsData = [
    {
      title: 'Total Students',
      value: 1247,
      change: { value: 5.2, type: 'increase' as const },
      icon: 'UserGroupIcon',
      color: 'blue' as const
    },
    {
      title: 'Daily Attendance',
      value: '94.8%',
      change: { value: 2.1, type: 'increase' as const },
      icon: 'ClipboardDocumentCheckIcon',
      color: 'green' as const
    },
    {
      title: 'Pending Requests',
      value: 23,
      change: { value: 12.5, type: 'decrease' as const },
      icon: 'ClockIcon',
      color: 'yellow' as const
    },
    {
      title: 'Active Alerts',
      value: 7,
      change: { value: 8.3, type: 'increase' as const },
      icon: 'ExclamationTriangleIcon',
      color: 'red' as const
    }
  ];

  const quickActions = [
    {
      title: 'Send Bulk Notification',
      description: 'Send announcements to all students',
      icon: 'SpeakerWaveIcon',
      href: '/notifications',
      variant: 'primary' as const
    },
    {
      title: 'Emergency Alert',
      description: 'Send urgent alerts to students & parents',
      icon: 'ShieldExclamationIcon',
      variant: 'danger' as const
    },
    {
      title: 'Generate Reports',
      description: 'Create attendance & activity reports',
      icon: 'DocumentChartBarIcon',
      href: '/reports',
      variant: 'secondary' as const
    }
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'attendance',
      title: 'Morning Attendance Completed',
      description: 'All departments have submitted morning attendance records',
      timestamp: '2 hours ago',
      priority: 'low'
    },
    {
      id: '2',
      type: 'leave',
      title: 'Leave Request Approved',
      description: 'Medical leave approved for emergency treatment',
      timestamp: '3 hours ago',
      priority: 'medium',
      student: 'John Smith (CS-2021-045)'
    },
    {
      id: '3',
      type: 'notification',
      title: 'Parent Notification Sent',
      description: 'Absence alert sent to parent via Gmail',
      timestamp: '4 hours ago',
      priority: 'high',
      student: 'Sarah Johnson (EE-2020-123)'
    }
  ];

  const urgentAlerts: Activity[] = [
    {
      id: '4',
      type: 'alert',
      title: 'Consecutive Absences Detected',
      description: 'Student absent for 3 consecutive days without leave',
      timestamp: '1 hour ago',
      priority: 'high',
      student: 'Mike Davis (ME-2021-089)'
    },
    {
      id: '5',
      type: 'alert',
      title: 'Overdue Leave Request',
      description: 'Leave request pending approval for 2 days',
      timestamp: '5 hours ago',
      priority: 'medium',
      student: 'Lisa Chen (CS-2020-156)'
    }
  ];

  const systemNotifications: Activity[] = [
    {
      id: '6',
      type: 'notification',
      title: 'System Backup Completed',
      description: 'Daily backup completed successfully at 3:00 AM',
      timestamp: '14 hours ago',
      priority: 'low'
    },
    {
      id: '7',
      type: 'notification',
      title: 'Gmail API Sync Status',
      description: 'All parent notifications synced successfully',
      timestamp: '6 hours ago',
      priority: 'low'
    }
  ];

  const chartData: ChartData[] = [
    { day: 'Mon', attendance: 96, activities: 89 },
    { day: 'Tue', attendance: 94, activities: 92 },
    { day: 'Wed', attendance: 98, activities: 87 },
    { day: 'Thu', attendance: 92, activities: 94 },
    { day: 'Fri', attendance: 89, activities: 91 },
    { day: 'Sat', attendance: 85, activities: 88 },
    { day: 'Sun', attendance: 91, activities: 85 }
  ];

  const departments: Department[] = [
    {
      id: '1',
      name: 'Computer Science',
      totalStudents: 342,
      presentStudents: 325,
      attendanceRate: 95,
      color: '#2563EB'
    },
    {
      id: '2',
      name: 'Electrical Engineering',
      totalStudents: 289,
      presentStudents: 271,
      attendanceRate: 94,
      color: '#059669'
    },
    {
      id: '3',
      name: 'Mechanical Engineering',
      totalStudents: 267,
      presentStudents: 248,
      attendanceRate: 93,
      color: '#DC2626'
    },
    {
      id: '4',
      name: 'Civil Engineering',
      totalStudents: 234,
      presentStudents: 219,
      attendanceRate: 94,
      color: '#7C3AED'
    },
    {
      id: '5',
      name: 'Information Technology',
      totalStudents: 115,
      presentStudents: 108,
      attendanceRate: 94,
      color: '#EA580C'
    }
  ];

  const criticalAlerts: Alert[] = [
    {
      id: '1',
      type: 'attendance',
      title: 'Critical Attendance Pattern',
      description: 'Student has missed 5 consecutive days without proper leave application',
      studentName: 'Alex Rodriguez',
      studentId: 'CS-2021-078',
      severity: 'critical',
      timestamp: '30 min ago',
      actionRequired: true
    },
    {
      id: '2',
      type: 'leave',
      title: 'Overdue Leave Approval',
      description: 'Medical leave request pending approval for 48 hours',
      studentName: 'Emma Wilson',
      studentId: 'EE-2020-234',
      severity: 'high',
      timestamp: '2 hours ago',
      actionRequired: true
    },
    {
      id: '3',
      type: 'emergency',
      title: 'Emergency Contact Required',
      description: 'Student reported sick, parent contact unsuccessful',
      studentName: 'David Kim',
      studentId: 'ME-2021-145',
      severity: 'high',
      timestamp: '4 hours ago',
      actionRequired: true
    }
  ];

  const getTabActivities = () => {
    switch (activeTab) {
      case 'urgent': return urgentAlerts;
      case 'system': return systemNotifications;
      default: return recentActivities;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'urgent': return 'Urgent Alerts';
      case 'system': return 'System Notifications';
      default: return 'Recent Activities';
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case 'urgent': return 'ExclamationTriangleIcon';
      case 'system': return 'ComputerDesktopIcon';
      default: return 'ClockIcon';
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-muted rounded-lg"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              href={action.href}
              variant={action.variant}
            />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities and Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Tabs */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6 border-b border-border">
              {['recent', 'urgent', 'system'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab === 'recent' && 'Recent Activities'}
                  {tab === 'urgent' && 'Urgent Alerts'}
                  {tab === 'system' && 'System Notifications'}
                </button>
              ))}
            </div>
            
            <ActivityTab
              activities={getTabActivities()}
              title={getTabTitle()}
              icon={getTabIcon()}
            />
          </div>

          {/* Attendance Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-primary">Analytics</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                    chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Line
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                    chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Bar
                </button>
              </div>
            </div>
            <AttendanceChart data={chartData} type={chartType} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Department Breakdown */}
          <DepartmentBreakdown departments={departments} />
          
          {/* Critical Alerts */}
          <CriticalAlerts alerts={criticalAlerts} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardInteractive;