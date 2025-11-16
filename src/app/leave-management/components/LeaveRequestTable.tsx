'use client';

import React from 'react';
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
  leaveType: 'sick' | 'emergency' | 'personal' | 'home' | 'medical';
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  documents?: string[];
}

interface LeaveRequestTableProps {
  requests: LeaveRequest[];
  selectedRequests: string[];
  onSelectRequest: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (id: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const LeaveRequestTable = ({
  requests,
  selectedRequests,
  onSelectRequest,
  onSelectAll,
  onApprove,
  onReject,
  onViewDetails,
  sortBy,
  sortOrder,
  onSort
}: LeaveRequestTableProps) => {
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

  const handleSort = (field: string) => {
    onSort(field);
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return 'ChevronUpDownIcon';
    return sortOrder === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon';
  };

  const allSelected = requests.length > 0 && selectedRequests.length === requests.length;
  const someSelected = selectedRequests.length > 0 && selectedRequests.length < requests.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-muted/70 transition-colors duration-200"
                onClick={() => handleSort('studentName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Student</span>
                  <Icon name={getSortIcon('studentName') as any} size={16} />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-muted/70 transition-colors duration-200"
                onClick={() => handleSort('leaveType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  <Icon name={getSortIcon('leaveType') as any} size={16} />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-muted/70 transition-colors duration-200"
                onClick={() => handleSort('duration')}
              >
                <div className="flex items-center space-x-1">
                  <span>Duration</span>
                  <Icon name={getSortIcon('duration') as any} size={16} />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Dates</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">Reason</th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-muted/70 transition-colors duration-200"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon name={getSortIcon('status') as any} size={16} />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-muted/70 transition-colors duration-200"
                onClick={() => handleSort('submittedAt')}
              >
                <div className="flex items-center space-x-1">
                  <span>Submitted</span>
                  <Icon name={getSortIcon('submittedAt') as any} size={16} />
                </div>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-muted/30 transition-colors duration-200">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => onSelectRequest(request.id)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <AppImage
                      src={request.studentImage}
                      alt={request.studentImageAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <Link
                        href={`/student-profile?id=${request.studentId}`}
                        className="font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      >
                        {request.studentName}
                      </Link>
                      <p className="text-xs text-text-secondary">{request.department}</p>
                    </div>
                    {request.priority !== 'low' && (
                      <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={getLeaveTypeIcon(request.leaveType) as any} size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary capitalize">{request.leaveType}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary font-medium">{request.duration} days</span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-text-primary">
                    <div>{request.startDate}</div>
                    <div className="text-text-secondary">to {request.endDate}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="text-sm text-text-primary truncate" title={request.reason}>
                      {request.reason}
                    </p>
                    {request.documents && request.documents.length > 0 && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="PaperClipIcon" size={12} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">{request.documents.length}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">{request.submittedAt}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewDetails(request.id)}
                      className="p-1 text-text-secondary hover:text-primary hover:bg-primary/10 rounded transition-colors duration-200"
                      title="View Details"
                    >
                      <Icon name="EyeIcon" size={16} />
                    </button>
                    
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onReject(request.id)}
                          className="p-1 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded transition-colors duration-200"
                          title="Reject"
                        >
                          <Icon name="XMarkIcon" size={16} />
                        </button>
                        <button
                          onClick={() => onApprove(request.id)}
                          className="p-1 text-text-secondary hover:text-success hover:bg-success/10 rounded transition-colors duration-200"
                          title="Approve"
                        >
                          <Icon name="CheckIcon" size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {requests.length === 0 && (
        <div className="text-center py-12">
          <Icon name="DocumentTextIcon" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No leave requests found</h3>
          <p className="text-text-secondary">No requests match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestTable;