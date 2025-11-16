'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  year: number;
  roomNumber: string;
  roomBlock: string;
  phone: string;
  avatar: string;
  alt: string;
  attendanceStatus: 'present' | 'absent' | 'late' | 'on-leave';
  lastActivity: string;
  parentContact: boolean;
  joinDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalInfo: {
    bloodGroup: string;
    allergies: string[];
    medications: string[];
  };
}

interface StudentProfileModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (studentId: string) => void;
  onContactParent: (studentId: string) => void;
}

const StudentProfileModal = ({ 
  student, 
  isOpen, 
  onClose, 
  onEdit, 
  onContactParent 
}: StudentProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'communication'>('profile');

  if (!isOpen || !student) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'UserIcon' },
    { id: 'attendance', label: 'Attendance', icon: 'ClipboardDocumentCheckIcon' },
    { id: 'communication', label: 'Communication', icon: 'ChatBubbleLeftRightIcon' }
  ];

  const mockAttendanceData = [
    { date: '2024-11-12', status: 'present', activity: 'Morning Assembly' },
    { date: '2024-11-11', status: 'present', activity: 'Evening Study' },
    { date: '2024-11-10', status: 'absent', activity: 'Gym Session' },
    { date: '2024-11-09', status: 'present', activity: 'Breakfast' },
    { date: '2024-11-08', status: 'late', activity: 'Morning Assembly' }
  ];

  const mockCommunicationLogs = [
    { 
      date: '2024-11-10', 
      type: 'parent-call', 
      message: 'Called parent regarding absence from gym session',
      status: 'completed'
    },
    { 
      date: '2024-11-08', 
      type: 'notification', 
      message: 'Automated late arrival notification sent to parents',
      status: 'sent'
    },
    { 
      date: '2024-11-05', 
      type: 'email', 
      message: 'Weekly attendance report sent to parents',
      status: 'delivered'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { color: 'bg-success/10 text-success', label: 'Present' },
      absent: { color: 'bg-destructive/10 text-destructive', label: 'Absent' },
      late: { color: 'bg-warning/10 text-warning', label: 'Late' },
      'on-leave': { color: 'bg-muted text-muted-foreground', label: 'On Leave' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <AppImage
              src={student.avatar}
              alt={student.alt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{student.name}</h2>
              <p className="text-sm text-text-secondary">{student.studentId} • {student.department}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(student.id)}
              className="flex items-center px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
            >
              <Icon name="PencilIcon" size={16} className="mr-2" />
              Edit
            </button>
            
            <button
              onClick={() => onContactParent(student.id)}
              className="flex items-center px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 rounded-md transition-colors duration-200"
            >
              <Icon name="PhoneIcon" size={16} className="mr-2" />
              Contact Parent
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-accent rounded-md transition-colors duration-200"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon as any} size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Student ID</label>
                        <p className="text-sm text-text-primary">{student.studentId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Email</label>
                        <p className="text-sm text-text-primary">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Phone</label>
                        <p className="text-sm text-text-primary">{student.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Room</label>
                        <p className="text-sm text-text-primary">{student.roomBlock}-{student.roomNumber}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Department</label>
                        <p className="text-sm text-text-primary">{student.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Academic Year</label>
                        <p className="text-sm text-text-primary">{student.year}th Year</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Join Date</label>
                      <p className="text-sm text-text-primary">{student.joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Address</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-text-primary">{student.address.street}</p>
                    <p className="text-sm text-text-primary">
                      {student.address.city}, {student.address.state} {student.address.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Medical Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Emergency Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Name</label>
                      <p className="text-sm text-text-primary">{student.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Relationship</label>
                      <p className="text-sm text-text-primary">{student.emergencyContact.relationship}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Phone</label>
                        <p className="text-sm text-text-primary">{student.emergencyContact.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Email</label>
                        <p className="text-sm text-text-primary">{student.emergencyContact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Medical Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Blood Group</label>
                      <p className="text-sm text-text-primary">{student.medicalInfo.bloodGroup}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Allergies</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.medicalInfo.allergies.map((allergy, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 text-xs bg-warning/10 text-warning rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Current Medications</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.medicalInfo.medications.map((medication, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                            {medication}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">Recent Attendance</h3>
              <div className="space-y-3">
                {mockAttendanceData.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm">
                        <p className="font-medium text-text-primary">{record.activity}</p>
                        <p className="text-text-secondary">{record.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">Communication History</h3>
              <div className="space-y-3">
                {mockCommunicationLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <Icon 
                      name={log.type === 'parent-call' ? 'PhoneIcon' : log.type === 'email' ? 'EnvelopeIcon' : 'BellIcon'} 
                      size={16} 
                      className="text-text-secondary mt-1 shrink-0" 
                    />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{log.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-text-secondary">{log.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          log.status === 'completed' ? 'bg-success/10 text-success' :
                          log.status === 'sent'? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;