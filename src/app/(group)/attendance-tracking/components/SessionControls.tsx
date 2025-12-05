'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SessionControlsProps {
  currentActivity: string;
  sessionStatus: 'active' | 'completed' | 'not-started';
  onStartSession: () => void;
  onCompleteSession: () => void;
  onSendNotifications: () => void;
  onExportData: () => void;
}

const SessionControls = ({
  currentActivity,
  sessionStatus,
  onStartSession,
  onCompleteSession,
  onSendNotifications,
  onExportData
}: SessionControlsProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'complete' | 'notify' | null>(null);

  const handleConfirmAction = () => {
    if (confirmAction === 'complete') {
      onCompleteSession();
    } else if (confirmAction === 'notify') {
      onSendNotifications();
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const openConfirmDialog = (action: 'complete' | 'notify') => {
    setConfirmAction(action);
    setShowConfirmDialog(true);
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Session Controls</h3>
            <p className="text-sm text-text-secondary">Current Activity: {currentActivity}</p>
          </div>
          <div className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${sessionStatus === 'active' ? 'bg-success/10 text-success' :
              sessionStatus === 'completed'? 'bg-muted text-text-secondary' : 'bg-warning/10 text-warning'}
          `}>
            {sessionStatus === 'active' ? 'Active Session' :
             sessionStatus === 'completed' ? 'Completed' : 'Not Started'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sessionStatus === 'not-started' && (
            <button
              onClick={onStartSession}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="PlayIcon" size={16} />
              <span className="font-medium">Start Session</span>
            </button>
          )}

          {sessionStatus === 'active' && (
            <button
              onClick={() => openConfirmDialog('complete')}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-success text-success-foreground rounded-md hover:bg-success/90 transition-colors duration-200"
            >
              <Icon name="CheckIcon" size={16} />
              <span className="font-medium">Complete Session</span>
            </button>
          )}

          <button
            onClick={() => openConfirmDialog('notify')}
            disabled={sessionStatus === 'not-started'}
            className={`
              flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-colors duration-200
              ${sessionStatus === 'not-started' ?'bg-muted text-text-secondary cursor-not-allowed' :'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              }
            `}
          >
            <Icon name="BellIcon" size={16} />
            <span>Send Notifications</span>
          </button>

          <button
            onClick={onExportData}
            disabled={sessionStatus === 'not-started'}
            className={`
              flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-colors duration-200
              ${sessionStatus === 'not-started' ?'bg-muted text-text-secondary cursor-not-allowed' :'border border-border text-text-primary hover:bg-accent'
              }
            `}
          >
            <Icon name="ArrowDownTrayIcon" size={16} />
            <span>Export Data</span>
          </button>

          <button
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-border text-text-primary hover:bg-accent rounded-md transition-colors duration-200"
          >
            <Icon name="Cog6ToothIcon" size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Icon name="ExclamationTriangleIcon" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Confirm Action</h3>
                <p className="text-sm text-text-secondary">
                  {confirmAction === 'complete' 
                    ? 'Are you sure you want to complete this session? This action cannot be undone.' :'Send automated notifications to parents of absent students?'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-accent transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${confirmAction === 'complete' 
                    ? 'bg-success text-success-foreground hover:bg-success/90' :'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }
                `}
              >
                {confirmAction === 'complete' ? 'Complete Session' : 'Send Notifications'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionControls;