import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: string;
  type: 'attendance' | 'leave' | 'notification' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  priority?: 'low' | 'medium' | 'high';
  student?: string;
}

interface ActivityTabProps {
  activities: Activity[];
  title: string;
  icon: string;
}

const ActivityTab = ({ activities, title, icon }: ActivityTabProps) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance': return 'ClipboardDocumentCheckIcon';
      case 'leave': return 'CalendarDaysIcon';
      case 'notification': return 'BellIcon';
      case 'alert': return 'ExclamationTriangleIcon';
      default: return 'InformationCircleIcon';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name={icon as any} size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">{title}</h3>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          {activities.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="InboxIcon" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No recent activities</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Icon name={getTypeIcon(activity.type) as any} size={16} className="text-accent-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-text-primary truncate">{activity.title}</h4>
                    {activity.priority && (
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(activity.priority)} bg-current`}></span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{activity.timestamp}</span>
                    {activity.student && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {activity.student}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityTab;