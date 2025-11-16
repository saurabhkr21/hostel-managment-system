import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface AttendanceStatsProps {
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateArrivals: number;
  participationRate: number;
  aiAlertsCount: number;
}

const AttendanceStats = ({
  totalStudents,
  presentStudents,
  absentStudents,
  lateArrivals,
  participationRate,
  aiAlertsCount
}: AttendanceStatsProps) => {
  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: 'UserGroupIcon',
      color: 'text-text-primary',
      bgColor: 'bg-muted'
    },
    {
      label: 'Present',
      value: presentStudents,
      icon: 'CheckCircleIcon',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Absent',
      value: absentStudents,
      icon: 'XCircleIcon',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      label: 'Late Arrivals',
      value: lateArrivals,
      icon: 'ClockIcon',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon as any} size={24} className={stat.color} />
            </div>
          </div>
        </div>
      ))}

      {/* Participation Rate Card */}
      <div className="bg-surface border border-border rounded-lg p-4 md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Participation Rate</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{participationRate}%</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="ChartBarIcon" size={24} className="text-primary" />
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`rounded-full h-2 transition-all duration-300 ${
                participationRate >= 80 ? 'bg-success' : 
                participationRate >= 60 ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${participationRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Alerts Card */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">AI Alerts</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{aiAlertsCount}</p>
          </div>
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center relative">
            <Icon name="BellIcon" size={24} className="text-secondary" />
            {aiAlertsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
        {aiAlertsCount > 0 && (
          <p className="text-xs text-destructive mt-2">Unusual absence patterns detected</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceStats;