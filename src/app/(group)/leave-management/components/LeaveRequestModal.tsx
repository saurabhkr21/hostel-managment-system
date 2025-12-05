'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentImage: string;
  studentImageAlt: string;
  department: string;
  roomNumber: string;
  contactNumber: string;
  emergencyContact: string;
  leaveType: 'sick' | 'emergency' | 'personal' | 'home' | 'medical';
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  documents?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  approvalHistory?: Array<{
    action: string;
    by: string;
    at: string;
    comment?: string;
  }>;
}

interface LeaveRequestModalProps {
  request: LeaveRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string, comment?: string) => void;
  onReject: (id: string, comment?: string) => void;
}

const LeaveRequestModal = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject
}: LeaveRequestModalProps) => {
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen || !request) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'expired':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'sick':
        return 'HeartIcon';
      case 'emergency':
        return 'ExclamationTriangleIcon';
      case 'personal':
        return 'UserIcon';
      case 'home':
        return 'HomeIcon';
      case 'medical':
        return 'PlusIcon';
      default:
        return 'DocumentIcon';
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    await onApprove(request.id, comment);
    setIsSubmitting(false);
    setComment('');
    onClose();
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    await onReject(request.id, comment);
    setIsSubmitting(false);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <AppImage
              src={request.studentImage}
              alt={request.studentImageAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{request.studentName}</h2>
              <p className="text-text-secondary">{request.department}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                {request.priority.toUpperCase()}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                {request.status.toUpperCase()}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Leave Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Leave Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name={getLeaveTypeIcon(request.leaveType) as any} size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Leave Type</p>
                      <p className="font-medium text-text-primary capitalize">{request.leaveType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="CalendarDaysIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Duration</p>
                      <p className="font-medium text-text-primary">{request.duration} days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="ClockIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Period</p>
                      <p className="font-medium text-text-primary">{request.startDate} to {request.endDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="ClockIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Submitted</p>
                      <p className="font-medium text-text-primary">{request.submittedAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Student Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="HomeIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Room Number</p>
                      <p className="font-medium text-text-primary">{request.roomNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="PhoneIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Contact Number</p>
                      <p className="font-medium text-text-primary">{request.contactNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="ExclamationTriangleIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Emergency Contact</p>
                      <p className="font-medium text-text-primary">{request.emergencyContact}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="UserIcon" size={20} className="text-text-secondary" />
                    <div>
                      <p className="text-sm text-text-secondary">Student Profile</p>
                      <Link
                        href={`/student-profile?id=${request.studentId}`}
                        className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        View Full Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-3">Reason for Leave</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-text-primary">{request.reason}</p>
              </div>
            </div>

            {/* Documents */}
            {request.documents && request.documents.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Supporting Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {request.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name="DocumentIcon" size={20} className="text-text-secondary" />
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{doc.name}</p>
                        <p className="text-sm text-text-secondary">{doc.type}</p>
                      </div>
                      <button className="p-1 text-primary hover:bg-primary/10 rounded transition-colors duration-200">
                        <Icon name="EyeIcon" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approval History */}
            {request.approvalHistory && request.approvalHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Approval History</h3>
                <div className="space-y-3">
                  {request.approvalHistory.map((history, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-text-primary">{history.action}</p>
                          <span className="text-sm text-text-secondary">by {history.by}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{history.at}</p>
                        {history.comment && (
                          <p className="text-sm text-text-primary mt-1">{history.comment}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Section */}
            {request.status === 'pending' && (
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Action Required</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Comment (Optional)
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment for your decision..."
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-200"
          >
            Close
          </button>
          
          {request.status === 'pending' && (
            <>
              <button
                onClick={handleReject}
                disabled={isSubmitting}
                className="px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="px-4 py-2 bg-success text-success-foreground hover:bg-success/90 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Approve'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;