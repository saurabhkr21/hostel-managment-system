import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

const MetricsCard = ({ title, value, change, icon, color }: MetricsCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200'
  };

  const iconBgClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100'
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={change.type === 'increase' ? 'ArrowUpIcon' : 'ArrowDownIcon'} 
                size={16} 
                className={change.type === 'increase' ? 'text-green-500' : 'text-red-500'} 
              />
              <span className={`text-sm ml-1 ${change.type === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(change.value)}%
              </span>
              <span className="text-sm text-text-secondary ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgClasses[color]}`}>
          <Icon name={icon as any} size={24} className={colorClasses[color].split(' ')[1]} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;