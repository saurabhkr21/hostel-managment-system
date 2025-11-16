'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LeaveRecord {
  id: string;
  type: 'sick' | 'personal' | 'emergency' | 'home';
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  documents?: string[];
}

interface LeaveRecordsTabProps {
  leaveRecords: LeaveRecord[];
}

const LeaveRecordsTab = ({ leaveRecords }: LeaveRecordsTabProps) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-error text-error-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'CheckCircleIcon';
      case 'rejected':
        return 'XCircleIcon';
      case 'pending':
        return 'ClockIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'personal':
        return 'bg-blue-100 text-blue-800';
      case 'emergency':
        return 'bg-orange-100 text-orange-800';
      case 'home':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sick':
        return 'HeartIcon';
      case 'personal':
        return 'UserIcon';
      case 'emergency':
        return 'ExclamationTriangleIcon';
      case 'home':
        return 'HomeIcon';
      default:
        return 'DocumentIcon';
    }
  };

  const filteredRecords = leaveRecords.filter(record => {
    const statusMatch = filterStatus === 'all' || record.status === filterStatus;
    const typeMatch = filterType === 'all' || record.type === filterType;
    return statusMatch && typeMatch;
  });

  const totalLeaves = leaveRecords.length;
  const approvedLeaves = leaveRecords.filter(r => r.status === 'approved').length;
  const pendingLeaves = leaveRecords.filter(r => r.status === 'pending').length;
  const totalDays = leaveRecords.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.duration, 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{totalLeaves}</div>
          <div className="text-sm text-text-secondary">Total Applications</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">{approvedLeaves}</div>
          <div className="text-sm text-text-secondary">Approved</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">{pendingLeaves}</div>
          <div className="text-sm text-text-secondary">Pending</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">{totalDays}</div>
          <div className="text-sm text-text-secondary">Days Taken</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="emergency">Emergency Leave</option>
              <option value="home">Home Visit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leave Records List */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="DocumentTextIcon" size={20} />
          Leave Applications ({filteredRecords.length})
        </h3>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="DocumentIcon" size={48} className="mx-auto text-text-secondary mb-4" />
              <p className="text-text-secondary">No leave records found matching the selected filters.</p>
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div key={record.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Left Section - Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(record.type)}`}>
                          <Icon name={getTypeIcon(record.type) as any} size={16} />
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary capitalize">
                            {record.type.replace('-', ' ')} Leave
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Applied on {new Date(record.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(record.status)}`}>
                        <Icon name={getStatusIcon(record.status) as any} size={12} />
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary mb-1">Duration</p>
                        <p className="text-sm text-text-secondary">
                          {new Date(record.startDate).toLocaleDateString()} - {new Date(record.endDate).toLocaleDateString()}
                          <span className="ml-2 text-primary font-medium">({record.duration} days)</span>
                        </p>
                      </div>
                      {record.status === 'approved' && record.approvedBy && (
                        <div>
                          <p className="text-sm font-medium text-text-primary mb-1">Approved By</p>
                          <p className="text-sm text-text-secondary">
                            {record.approvedBy} on {record.approvedDate && new Date(record.approvedDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-text-primary mb-1">Reason</p>
                      <p className="text-sm text-text-secondary">{record.reason}</p>
                    </div>
                    
                    {record.documents && record.documents.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-text-primary mb-2">Attachments</p>
                        <div className="flex flex-wrap gap-2">
                          {record.documents.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                              <Icon name="DocumentIcon" size={14} />
                              <span className="text-xs text-text-secondary">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Section - Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                      <Icon name="EyeIcon" size={14} />
                      View Details
                    </button>
                    {record.status === 'pending' && (
                      <button className="flex items-center gap-2 px-3 py-2 text-sm bg-error text-error-foreground rounded-md hover:bg-error/90 transition-colors duration-200">
                        <Icon name="XMarkIcon" size={14} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="PlusIcon" size={20} />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200">
            <div className="p-2 bg-red-100 text-red-800 rounded-lg">
              <Icon name="HeartIcon" size={16} />
            </div>
            <div className="text-left">
              <p className="font-medium text-text-primary">Sick Leave</p>
              <p className="text-sm text-text-secondary">Medical reasons</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Icon name="UserIcon" size={16} />
            </div>
            <div className="text-left">
              <p className="font-medium text-text-primary">Personal Leave</p>
              <p className="text-sm text-text-secondary">Personal matters</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200">
            <div className="p-2 bg-orange-100 text-orange-800 rounded-lg">
              <Icon name="ExclamationTriangleIcon" size={16} />
            </div>
            <div className="text-left">
              <p className="font-medium text-text-primary">Emergency</p>
              <p className="text-sm text-text-secondary">Urgent situations</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200">
            <div className="p-2 bg-green-100 text-green-800 rounded-lg">
              <Icon name="HomeIcon" size={16} />
            </div>
            <div className="text-left">
              <p className="font-medium text-text-primary">Home Visit</p>
              <p className="text-sm text-text-secondary">Family visits</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRecordsTab;