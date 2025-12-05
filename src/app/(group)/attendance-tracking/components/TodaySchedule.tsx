import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ScheduleItem {
  id: string;
  activity: string;
  timeSlot: string;
  expectedParticipants: number;
  actualParticipants: number;
  status: 'completed' | 'active' | 'upcoming';
  location: string;
}

interface TodayScheduleProps {
  scheduleItems: ScheduleItem[];
}

const TodaySchedule = ({ scheduleItems }: TodayScheduleProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircleIcon', color: 'text-success' };
      case 'active':
        return { name: 'PlayCircleIcon', color: 'text-warning' };
      case 'upcoming':
        return { name: 'ClockIcon', color: 'text-text-secondary' };
      default:
        return { name: 'ClockIcon', color: 'text-text-secondary' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'active':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'upcoming':
        return 'bg-muted text-text-secondary border-border';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const completedCount = scheduleItems.filter(item => item.status === 'completed').length;
  const totalCount = scheduleItems.length;

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Today's Schedule</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="CalendarDaysIcon" size={16} />
            <span>{completedCount}/{totalCount} completed</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            <span>Daily Progress</span>
            <span>{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {scheduleItems.map((item) => {
          const statusIcon = getStatusIcon(item.status);
          const participationRate = Math.round((item.actualParticipants / item.expectedParticipants) * 100);
          
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-accent transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={statusIcon.name as any} 
                  size={20} 
                  className={statusIcon.color} 
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary">{item.activity}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium border rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="ClockIcon" size={14} />
                      <span>{item.timeSlot}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPinIcon" size={14} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {item.actualParticipants}/{item.expectedParticipants}
                </div>
                <div className={`text-xs ${participationRate >= 80 ? 'text-success' : participationRate >= 60 ? 'text-warning' : 'text-destructive'}`}>
                  {participationRate}% attendance
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {scheduleItems.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="CalendarDaysIcon" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">No activities scheduled for today.</p>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;