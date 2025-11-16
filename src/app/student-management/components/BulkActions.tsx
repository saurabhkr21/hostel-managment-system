'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BulkActionsProps {
  selectedCount: number;
  onBulkAction: (action: string, data?: any) => void;
  onClearSelection: () => void;
}

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }: BulkActionsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const bulkActionItems = [
    { 
      id: 'send-notification', 
      label: 'Send Notification', 
      icon: 'BellIcon',
      description: 'Send custom message to selected students'
    },
    { 
      id: 'mark-present', 
      label: 'Mark Present', 
      icon: 'CheckCircleIcon',
      description: 'Mark all selected students as present'
    },
    { 
      id: 'mark-absent', 
      label: 'Mark Absent', 
      icon: 'XCircleIcon',
      description: 'Mark all selected students as absent'
    },
    { 
      id: 'contact-parents', 
      label: 'Contact Parents', 
      icon: 'PhoneIcon',
      description: 'Send automated message to parents'
    },
    { 
      id: 'export-data', 
      label: 'Export Data', 
      icon: 'DocumentArrowDownIcon',
      description: 'Export selected student data'
    },
    { 
      id: 'generate-report', 
      label: 'Generate Report', 
      icon: 'DocumentChartBarIcon',
      description: 'Create attendance report'
    }
  ];

  const handleBulkAction = (actionId: string) => {
    setIsDropdownOpen(false);
    
    if (actionId === 'send-notification') {
      setIsNotificationModalOpen(true);
    } else {
      onBulkAction(actionId);
    }
  };

  const handleSendNotification = () => {
    if (notificationMessage.trim()) {
      onBulkAction('send-notification', { message: notificationMessage });
      setIsNotificationModalOpen(false);
      setNotificationMessage('');
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-surface border border-border rounded-lg shadow-lg p-4 min-w-80">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <span className="text-sm font-medium text-primary-foreground">{selectedCount}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {selectedCount} student{selectedCount > 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                  <Icon name="EllipsisHorizontalIcon" size={16} className="mr-2" />
                  Actions
                  <Icon name="ChevronDownIcon" size={16} className="ml-2" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-md shadow-lg py-2">
                    {bulkActionItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleBulkAction(item.id)}
                        className="w-full flex items-start px-4 py-3 text-left hover:bg-accent transition-colors duration-200"
                      >
                        <Icon name={item.icon as any} size={16} className="text-text-secondary mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-popover-foreground">{item.label}</p>
                          <p className="text-xs text-text-secondary">{item.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={onClearSelection}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-accent rounded-md transition-colors duration-200"
                title="Clear selection"
              >
                <Icon name="XMarkIcon" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4">
          <div className="bg-surface rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Send Notification</h3>
              <button
                onClick={() => setIsNotificationModalOpen(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-2">
                  Sending to {selectedCount} selected student{selectedCount > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter your message here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setIsNotificationModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-accent transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendNotification}
                  disabled={!notificationMessage.trim()}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;