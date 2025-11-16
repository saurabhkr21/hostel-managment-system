import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Department {
  id: string;
  name: string;
  totalStudents: number;
  presentStudents: number;
  attendanceRate: number;
  color: string;
}

interface DepartmentBreakdownProps {
  departments: Department[];
}

const DepartmentBreakdown = ({ departments }: DepartmentBreakdownProps) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Department-wise Attendance</h3>
        <Icon name="ChartBarIcon" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dept.color }}
                ></div>
                <span className="text-sm font-medium text-text-primary">{dept.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-text-primary">
                  {dept.attendanceRate}%
                </span>
                <p className="text-xs text-text-secondary">
                  {dept.presentStudents}/{dept.totalStudents} present
                </p>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${dept.attendanceRate}%`,
                  backgroundColor: dept.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Overall Attendance</span>
          <span className="font-semibold text-text-primary">
            {Math.round(departments.reduce((acc, dept) => acc + dept.attendanceRate, 0) / departments.length)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentBreakdown;