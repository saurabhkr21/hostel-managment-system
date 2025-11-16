import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface AIAlert {
  id: string;
  studentName: string;
  pattern: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  daysCount: number;
}

interface AIInsightsProps {
  alerts: AIAlert[];
  onDismissAlert: (alertId: string) => void;
  onSendParentNotification: (studentName: string) => void;
}

const AIInsights = ({ alerts, onDismissAlert, onSendParentNotification }: AIInsightsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-destructive bg-destructive/5 text-destructive';
      case 'medium':
        return 'border-warning bg-warning/5 text-warning';
      case 'low':
        return 'border-muted bg-muted text-text-secondary';
      default:
        return 'border-muted bg-muted text-text-secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'ExclamationTriangleIcon';
      case 'medium':
        return 'ExclamationCircleIcon';
      case 'low':
        return 'InformationCircleIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircleIcon" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">All Clear!</h3>
          <p className="text-text-secondary">No unusual attendance patterns detected by AI monitoring.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CpuChipIcon" size={20} className="text-secondary" />
            <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span>Real-time monitoring</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getSeverityIcon(alert.severity) as any} 
                  size={20} 
                  className="mt-0.5" 
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{alert.studentName}</h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-current/10 rounded-full">
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{alert.pattern}</p>
                  <p className="text-xs opacity-80">{alert.recommendation}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-xs">
                      Pattern detected over {alert.daysCount} days
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onSendParentNotification(alert.studentName)}
                  className="p-1.5 hover:bg-current/10 rounded-md transition-colors duration-200"
                  title="Send parent notification"
                >
                  <Icon name="BellIcon" size={16} />
                </button>
                <button
                  onClick={() => onDismissAlert(alert.id)}
                  className="p-1.5 hover:bg-current/10 rounded-md transition-colors duration-200"
                  title="Dismiss alert"
                >
                  <Icon name="XMarkIcon" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;