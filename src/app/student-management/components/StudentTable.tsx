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
}

interface StudentTableProps {
  students: Student[];
  selectedStudents: string[];
  onStudentSelect: (studentId: string) => void;
  onSelectAll: (selected: boolean) => void;
  onStudentClick: (student: Student) => void;
  onQuickAction: (action: string, studentId: string) => void;
}

const StudentTable = ({
  students,
  selectedStudents,
  onStudentSelect,
  onSelectAll,
  onStudentClick,
  onQuickAction
}: StudentTableProps) => {
  const [sortField, setSortField] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: Student['attendanceStatus']) => {
    const statusConfig = {
      present: { color: 'bg-success/10 text-success', label: 'Present' },
      absent: { color: 'bg-destructive/10 text-destructive', label: 'Absent' },
      late: { color: 'bg-warning/10 text-warning', label: 'Late' },
      'on-leave': { color: 'bg-muted text-muted-foreground', label: 'On Leave' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getSortIcon = (field: keyof Student) => {
    if (sortField !== field) {
      return <Icon name="ChevronUpDownIcon" size={16} className="text-text-secondary" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? "ChevronUpIcon" : "ChevronDownIcon"} 
        size={16} 
        className="text-primary" 
      />
    );
  };

  const allSelected = students.length > 0 && selectedStudents.length === students.length;
  const someSelected = selectedStudents.length > 0 && selectedStudents.length < students.length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-border focus:ring-2 focus:ring-primary"
                />
              </th>
              
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-accent transition-colors duration-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Student</span>
                  {getSortIcon('name')}
                </div>
              </th>
              
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-accent transition-colors duration-200"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Department</span>
                  {getSortIcon('department')}
                </div>
              </th>
              
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-accent transition-colors duration-200"
                onClick={() => handleSort('roomNumber')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Room</span>
                  {getSortIcon('roomNumber')}
                </div>
              </th>
              
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-accent transition-colors duration-200"
                onClick={() => handleSort('attendanceStatus')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">Status</span>
                  {getSortIcon('attendanceStatus')}
                </div>
              </th>
              
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-primary">Last Activity</span>
              </th>
              
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {students.map((student) => (
              <tr 
                key={student.id}
                className="hover:bg-accent/50 transition-colors duration-200 cursor-pointer"
                onClick={() => onStudentClick(student)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onStudentSelect(student.id);
                    }}
                    className="rounded border-border focus:ring-2 focus:ring-primary"
                  />
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <AppImage
                      src={student.avatar}
                      alt={student.alt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{student.name}</p>
                      <p className="text-xs text-text-secondary">{student.studentId}</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm text-text-primary">{student.department}</p>
                    <p className="text-xs text-text-secondary">{student.year}th Year</p>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{student.roomBlock}-{student.roomNumber}</span>
                </td>
                
                <td className="px-4 py-3">
                  {getStatusBadge(student.attendanceStatus)}
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">{student.lastActivity}</span>
                    {student.parentContact && (
                      <Icon name="PhoneIcon" size={14} className="text-success" />
                    )}
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAction('edit', student.id);
                      }}
                      className="p-1 text-text-secondary hover:text-primary hover:bg-primary/10 rounded transition-colors duration-200"
                      title="Edit Profile"
                    >
                      <Icon name="PencilIcon" size={16} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAction('contact', student.id);
                      }}
                      className="p-1 text-text-secondary hover:text-secondary hover:bg-secondary/10 rounded transition-colors duration-200"
                      title="Contact Parent"
                    >
                      <Icon name="PhoneIcon" size={16} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAction('attendance', student.id);
                      }}
                      className="p-1 text-text-secondary hover:text-warning hover:bg-warning/10 rounded transition-colors duration-200"
                      title="View Attendance"
                    >
                      <Icon name="ClipboardDocumentCheckIcon" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors duration-200 cursor-pointer"
            onClick={() => onStudentClick(student)}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  onStudentSelect(student.id);
                }}
                className="mt-1 rounded border-border focus:ring-2 focus:ring-primary"
              />
              
              <AppImage
                src={student.avatar}
                alt={student.alt}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">{student.name}</h3>
                    <p className="text-xs text-text-secondary">{student.studentId}</p>
                  </div>
                  {getStatusBadge(student.attendanceStatus)}
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-text-secondary">Department:</span>
                    <p className="text-text-primary">{student.department}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Room:</span>
                    <p className="text-text-primary">{student.roomBlock}-{student.roomNumber}</p>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{student.lastActivity}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAction('edit', student.id);
                      }}
                      className="p-1 text-text-secondary hover:text-primary rounded"
                    >
                      <Icon name="PencilIcon" size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAction('contact', student.id);
                      }}
                      className="p-1 text-text-secondary hover:text-secondary rounded"
                    >
                      <Icon name="PhoneIcon" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;