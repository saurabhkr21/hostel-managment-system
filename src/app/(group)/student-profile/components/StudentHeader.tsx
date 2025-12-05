import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StudentData {
  id: string;
  name: string;
  studentId: string;
  department: string;
  year: string;
  room: string;
  phone: string;
  email: string;
  profileImage: string;
  profileImageAlt: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

interface StudentHeaderProps {
  student: StudentData;
}

const StudentHeader = ({ student }: StudentHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-error text-error-foreground';
      case 'on-leave':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'CheckCircleIcon';
      case 'inactive':
        return 'XCircleIcon';
      case 'on-leave':
        return 'ClockIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Profile Image */}
        <div className="shrink-0">
          <div className="relative">
            <AppImage
              src={student.profileImage}
              alt={student.profileImageAlt}
              className="w-32 h-32 rounded-lg object-cover border-2 border-border"
            />
            <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(student.status)}`}>
              <Icon name={getStatusIcon(student.status) as any} size={12} />
              {student.status.charAt(0).toUpperCase() + student.status.slice(1).replace('-', ' ')}
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">{student.name}</h1>
              <p className="text-text-secondary text-sm mb-2">Student ID: {student.studentId}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1 text-text-secondary">
                  <Icon name="AcademicCapIcon" size={16} />
                  <span>{student.department} - {student.year}</span>
                </div>
                <div className="flex items-center gap-1 text-text-secondary">
                  <Icon name="HomeIcon" size={16} />
                  <span>Room {student.room}</span>
                </div>
                <div className="flex items-center gap-1 text-text-secondary">
                  <Icon name="CalendarIcon" size={16} />
                  <span>Joined {student.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                <Icon name="UserIcon" size={16} />
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="PhoneIcon" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">{student.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="EnvelopeIcon" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">{student.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                <Icon name="ExclamationTriangleIcon" size={16} />
                Emergency Contact
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="UserIcon" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">{student.emergencyContact.name} ({student.emergencyContact.relation})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="PhoneIcon" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">{student.emergencyContact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;