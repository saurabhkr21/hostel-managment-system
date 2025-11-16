'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  room: string;
  avatar: string;
  alt: string;
  isPresent: boolean;
  arrivalTime?: string;
  lateArrival?: boolean;
}

interface StudentRosterProps {
  students: Student[];
  onAttendanceToggle: (studentId: string) => void;
  onBulkSelect: (studentIds: string[], isPresent: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const StudentRoster = ({ 
  students, 
  onAttendanceToggle, 
  onBulkSelect, 
  searchQuery, 
  onSearchChange 
}: StudentRosterProps) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBulkAction = (isPresent: boolean) => {
    onBulkSelect(selectedStudents, isPresent);
    setSelectedStudents([]);
    setShowBulkActions(false);
  };

  const presentCount = filteredStudents.filter(s => s.isPresent).length;
  const absentCount = filteredStudents.length - presentCount;

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Header with Search and Stats */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-text-primary">Student Roster</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-text-secondary">Present: {presentCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-text-secondary">Absent: {absentCount}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
          >
            <Icon name="CheckCircleIcon" size={16} />
            <span>Bulk Actions</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Icon 
            name="MagnifyingGlassIcon" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            type="text"
            placeholder="Search by name, roll number, or department..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className="mt-4 p-3 bg-accent rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <Icon 
                    name={selectedStudents.length === filteredStudents.length ? "CheckSquareIcon" : "SquareIcon"} 
                    size={16} 
                  />
                  <span>Select All ({filteredStudents.length})</span>
                </button>
                {selectedStudents.length > 0 && (
                  <span className="text-sm text-text-secondary">
                    {selectedStudents.length} selected
                  </span>
                )}
              </div>
              
              {selectedStudents.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction(true)}
                    className="px-3 py-1 text-xs font-medium bg-success text-success-foreground rounded-md hover:bg-success/90"
                  >
                    Mark Present
                  </button>
                  <button
                    onClick={() => handleBulkAction(false)}
                    className="px-3 py-1 text-xs font-medium bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
                  >
                    Mark Absent
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Student List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className={`
              flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-accent transition-colors duration-200
              ${student.isPresent ? 'bg-success/5' : 'bg-destructive/5'}
            `}
          >
            <div className="flex items-center space-x-4">
              {showBulkActions && (
                <button
                  onClick={() => handleStudentSelect(student.id)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon 
                    name={selectedStudents.includes(student.id) ? "CheckSquareIcon" : "SquareIcon"} 
                    size={16} 
                  />
                </button>
              )}
              
              <div className="relative">
                <AppImage
                  src={student.avatar}
                  alt={student.alt}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`
                  absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-surface rounded-full
                  ${student.isPresent ? 'bg-success' : 'bg-destructive'}
                `}></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-text-primary">{student.name}</h4>
                  {student.lateArrival && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-warning text-warning-foreground rounded-full">
                      Late
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>{student.rollNumber}</span>
                  <span>{student.department}</span>
                  <span>Room {student.room}</span>
                  {student.arrivalTime && (
                    <span className="text-success">Arrived: {student.arrivalTime}</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => onAttendanceToggle(student.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors duration-200
                ${student.isPresent
                  ? 'bg-success text-success-foreground hover:bg-success/90'
                  : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                }
              `}
            >
              <Icon 
                name={student.isPresent ? "CheckIcon" : "XMarkIcon"} 
                size={16} 
              />
              <span>{student.isPresent ? 'Present' : 'Absent'}</span>
            </button>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="UserGroupIcon" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default StudentRoster;