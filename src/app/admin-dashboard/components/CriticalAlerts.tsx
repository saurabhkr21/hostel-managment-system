import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

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

interface CriticalAlertsProps {
  alerts: Alert[];
}

const CriticalAlerts = ({ alerts }: CriticalAlertsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-200 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance': return 'ExclamationTriangleIcon';
      case 'leave': return 'CalendarDaysIcon';
      case 'emergency': return 'ShieldExclamationIcon';
      case 'system': return 'ComputerDesktopIcon';
      default: return 'InformationCircleIcon';
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high');

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Critical Alerts</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs font-medium">
            {criticalAlerts.length} urgent
          </span>
          <Link 
            href="/alerts" 
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            View all
          </Link>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {criticalAlerts.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="CheckCircleIcon" size={48} className="mx-auto mb-2 text-green-500 opacity-50" />
            <p>No critical alerts</p>
            <p className="text-xs mt-1">All systems running smoothly</p>
          </div>
        ) : (
          criticalAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getTypeIcon(alert.type) as any} 
                  size={20} 
                  className="shrink-0 mt-0.5" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                    <span className="text-xs opacity-75">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                  
                  {alert.studentName && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="UserIcon" size={14} className="opacity-75" />
                      <span className="text-xs font-medium">{alert.studentName}</span>
                      {alert.studentId && (
                        <span className="text-xs opacity-75">({alert.studentId})</span>
                      )}
                    </div>
                  )}
                  
                  {alert.actionRequired && (
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-medium opacity-90">Action Required</span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-medium transition-colors duration-200">
                          Dismiss
                        </button>
                        <button className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-medium transition-colors duration-200">
                          Take Action
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CriticalAlerts;