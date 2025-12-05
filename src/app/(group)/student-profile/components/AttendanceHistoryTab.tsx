'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AttendanceRecord {
  date: string;
  activities: {
    breakfast: 'present' | 'absent' | 'late';
    lunch: 'present' | 'absent' | 'late';
    dinner: 'present' | 'absent' | 'late';
    gym: 'present' | 'absent' | 'late';
    study: 'present' | 'absent' | 'late';
    sports: 'present' | 'absent' | 'late';
  };
}

interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  currentStreak: number;
  longestStreak: number;
  attendancePercentage: number;
}

interface AttendanceHistoryTabProps {
  attendanceRecords: AttendanceRecord[];
  stats: AttendanceStats;
}

const AttendanceHistoryTab = ({ attendanceRecords, stats }: AttendanceHistoryTabProps) => {
  const [selectedMonth, setSelectedMonth] = useState('2024-11');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');

  const activities = [
    { key: 'all', label: 'All Activities', icon: 'CalendarIcon' },
    { key: 'breakfast', label: 'Breakfast', icon: 'SunIcon' },
    { key: 'lunch', label: 'Lunch', icon: 'ClockIcon' },
    { key: 'dinner', label: 'Dinner', icon: 'MoonIcon' },
    { key: 'gym', label: 'Gym', icon: 'FireIcon' },
    { key: 'study', label: 'Study Hours', icon: 'BookOpenIcon' },
    { key: 'sports', label: 'Sports', icon: 'TrophyIcon' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'absent':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return 'CheckIcon';
      case 'late':
        return 'ClockIcon';
      case 'absent':
        return 'XMarkIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const recordMonth = record.date.substring(0, 7);
    return recordMonth === selectedMonth;
  });

  const getOverallStatus = (activities: AttendanceRecord['activities']) => {
    const statuses = Object.values(activities);
    const presentCount = statuses.filter(s => s === 'present').length;
    const totalCount = statuses.length;
    
    if (presentCount === totalCount) return 'present';
    if (presentCount === 0) return 'absent';
    return 'partial';
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{stats.attendancePercentage}%</div>
          <div className="text-sm text-text-secondary">Overall</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">{stats.presentDays}</div>
          <div className="text-sm text-text-secondary">Present</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-error mb-1">{stats.absentDays}</div>
          <div className="text-sm text-text-secondary">Absent</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">{stats.currentStreak}</div>
          <div className="text-sm text-text-secondary">Current Streak</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">{stats.longestStreak}</div>
          <div className="text-sm text-text-secondary">Best Streak</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">{stats.totalDays}</div>
          <div className="text-sm text-text-secondary">Total Days</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="2024-11">November 2024</option>
              <option value="2024-10">October 2024</option>
              <option value="2024-09">September 2024</option>
              <option value="2024-08">August 2024</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">Activity</label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {activities.map(activity => (
                <option key={activity.key} value={activity.key}>{activity.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="CalendarIcon" size={20} />
          Attendance Calendar
        </h3>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const dateStr = `${selectedMonth}-${day.toString().padStart(2, '0')}`;
            const record = filteredRecords.find(r => r.date === dateStr);
            
            if (!record) {
              return (
                <div key={day} className="aspect-square flex items-center justify-center text-text-secondary bg-muted rounded-md">
                  {day}
                </div>
              );
            }
            
            const overallStatus = getOverallStatus(record.activities);
            const statusColor = getStatusColor(overallStatus);
            
            return (
              <div key={day} className={`aspect-square flex items-center justify-center text-sm font-medium rounded-md ${statusColor}`}>
                {day}
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span className="text-sm text-text-secondary">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded"></div>
            <span className="text-sm text-text-secondary">Partial/Late</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error rounded"></div>
            <span className="text-sm text-text-secondary">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <span className="text-sm text-text-secondary">No Data</span>
          </div>
        </div>
      </div>

      {/* Detailed Records */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="ListBulletIcon" size={20} />
          Daily Records
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredRecords.slice(0, 10).map((record) => (
            <div key={record.date} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">
                  {new Date(record.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getOverallStatus(record.activities))}`}>
                  {getOverallStatus(record.activities).charAt(0).toUpperCase() + getOverallStatus(record.activities).slice(1)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(record.activities).map(([activity, status]) => {
                  if (selectedActivity !== 'all' && selectedActivity !== activity) return null;
                  
                  return (
                    <div key={activity} className="flex items-center gap-2">
                      <Icon name={getStatusIcon(status) as any} size={14} className={getStatusColor(status).includes('success') ? 'text-success' : getStatusColor(status).includes('warning') ? 'text-warning' : 'text-error'} />
                      <span className="text-sm text-text-secondary capitalize">{activity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistoryTab;