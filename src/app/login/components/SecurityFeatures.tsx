import React from 'react';
import Icon from '@/components/ui/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Multi-Factor Authentication',
      description: 'Enhanced security with role-based access control'
    },
    {
      icon: 'LockClosedIcon',
      title: 'Data Encryption',
      description: 'End-to-end encryption for all sensitive information'
    },
    {
      icon: 'EyeSlashIcon',
      title: 'Privacy Protection',
      description: 'GDPR compliant data handling and storage'
    },
    {
      icon: 'ClockIcon',
      title: 'Session Management',
      description: 'Automatic logout for inactive sessions'
    }
  ];

  return (
    <div className="bg-surface rounded-lg p-6 border border-border">
      <div className="text-center mb-6">
        <Icon name="ShieldCheckIcon" size={32} className="text-primary mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">Secure Access</h3>
        <p className="text-sm text-text-secondary">
          Your data is protected with enterprise-grade security measures
        </p>
      </div>

      <div className="space-y-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature.icon as any} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary">{feature.title}</h4>
              <p className="text-xs text-text-secondary mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
          <Icon name="InformationCircleIcon" size={14} />
          <span>Last updated: November 2024</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;