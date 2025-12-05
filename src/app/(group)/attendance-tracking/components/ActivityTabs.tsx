'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: string;
  name: string;
  icon: string;
  currentSession: string;
  participantCount: number;
  totalExpected: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface ActivityTabsProps {
  activities: Activity[];
  activeTab: string;
  onTabChange: (activityId: string) => void;
}

const ActivityTabs = ({ activities, activeTab, onTabChange }: ActivityTabsProps) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-1">
      <div className="flex space-x-1">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => onTabChange(activity.id)}
            className={`
              flex-1 flex items-center justify-center px-4 py-3 rounded-md transition-all duration-200
              ${activeTab === activity.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-accent'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={activity.icon as any} 
                size={20} 
                className={activeTab === activity.id ? 'text-primary-foreground' : 'text-text-secondary'}
              />
              <div className="text-left">
                <div className="font-medium text-sm">{activity.name}</div>
                <div className={`text-xs ${activeTab === activity.id ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                  {activity.participantCount}/{activity.totalExpected}
                </div>
              </div>
              {activity.status === 'active' && (
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityTabs;