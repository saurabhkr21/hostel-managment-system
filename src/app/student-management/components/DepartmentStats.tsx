import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface DepartmentStat {
  department: string;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  onLeave: number;
  occupancyRate: number;
  color: string;
}

interface DepartmentStatsProps {
  stats: DepartmentStat[];
}

const DepartmentStats = ({ stats }: DepartmentStatsProps) => {
  const getTotalStats = () => {
    return stats.reduce(
      (acc, stat) => ({
        totalStudents: acc.totalStudents + stat.totalStudents,
        presentToday: acc.presentToday + stat.presentToday,
        absentToday: acc.absentToday + stat.absentToday,
        onLeave: acc.onLeave + stat.onLeave
      }),
      { totalStudents: 0, presentToday: 0, absentToday: 0, onLeave: 0 }
    );
  };

  const totalStats = getTotalStats();
  const overallAttendanceRate = totalStats.totalStudents > 0 
    ? Math.round((totalStats.presentToday / totalStats.totalStudents) * 100)
    : 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Department Overview</h2>
        <Icon name="ChartBarIcon" size={20} className="text-text-secondary" />
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">{totalStats.totalStudents}</p>
          <p className="text-sm text-text-secondary">Total Students</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{overallAttendanceRate}%</p>
          <p className="text-sm text-text-secondary">Attendance Rate</p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text-primary mb-3">Department Breakdown</h3>
        
        {stats.map((stat) => {
          const attendanceRate = stat.totalStudents > 0 
            ? Math.round((stat.presentToday / stat.totalStudents) * 100)
            : 0;

          return (
            <div key={stat.department} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${stat.color}`}
                    aria-hidden="true"
                  />
                  <h4 className="text-sm font-medium text-text-primary">{stat.department}</h4>
                </div>
                <span className="text-sm text-text-secondary">{stat.totalStudents} students</span>
              </div>

              {/* Attendance Breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                <div className="text-center">
                  <p className="font-medium text-success">{stat.presentToday}</p>
                  <p className="text-text-secondary">Present</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-destructive">{stat.absentToday}</p>
                  <p className="text-text-secondary">Absent</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-warning">{stat.onLeave}</p>
                  <p className="text-text-secondary">On Leave</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Attendance Rate</span>
                  <span className="font-medium text-text-primary">{attendanceRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{ width: `${attendanceRate}%` }}
                  />
                </div>
              </div>

              {/* Occupancy Rate */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Room Occupancy</span>
                  <span className="font-medium text-text-primary">{stat.occupancyRate}%</span>
                </div>
                <div className="mt-1 w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      stat.occupancyRate > 90 ? 'bg-destructive' :
                      stat.occupancyRate > 75 ? 'bg-warning' : 'bg-primary'
                    }`}
                    style={{ width: `${stat.occupancyRate}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-success/10 rounded-lg">
            <Icon name="CheckCircleIcon" size={20} className="text-success mx-auto mb-1" />
            <p className="text-sm font-medium text-success">{totalStats.presentToday}</p>
            <p className="text-xs text-text-secondary">Present Today</p>
          </div>
          <div className="p-3 bg-destructive/10 rounded-lg">
            <Icon name="ExclamationCircleIcon" size={20} className="text-destructive mx-auto mb-1" />
            <p className="text-sm font-medium text-destructive">{totalStats.absentToday}</p>
            <p className="text-xs text-text-secondary">Need Attention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStats;