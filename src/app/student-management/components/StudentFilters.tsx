'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOptions {
  department: string;
  year: string;
  roomBlock: string;
  attendanceStatus: string;
  searchQuery: string;
}

interface StudentFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalResults: number;
}

const StudentFilters = ({ filters, onFiltersChange, totalResults }: StudentFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' }
  ];

  const years = [
    { value: '', label: 'All Years' },
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  const roomBlocks = [
    { value: '', label: 'All Blocks' },
    { value: 'A', label: 'Block A' },
    { value: 'B', label: 'Block B' },
    { value: 'C', label: 'Block C' },
    { value: 'D', label: 'Block D' }
  ];

  const attendanceStatuses = [
    { value: '', label: 'All Status' },
    { value: 'present', label: 'Present Today' },
    { value: 'absent', label: 'Absent Today' },
    { value: 'late', label: 'Late Arrival' },
    { value: 'on-leave', label: 'On Leave' }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      department: '',
      year: '',
      roomBlock: '',
      attendanceStatus: '',
      searchQuery: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Icon 
            name="MagnifyingGlassIcon" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            type="text"
            placeholder="Search students by name, ID, or email..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-accent transition-colors duration-200"
          >
            <Icon name="FunnelIcon" size={16} className="mr-2" />
            Advanced Filters
            <Icon 
              name={isExpanded ? "ChevronUpIcon" : "ChevronDownIcon"} 
              size={16} 
              className="ml-2" 
            />
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors duration-200"
            >
              <Icon name="XMarkIcon" size={16} className="mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Department</label>
            <select
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Academic Year</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Room Block</label>
            <select
              value={filters.roomBlock}
              onChange={(e) => handleFilterChange('roomBlock', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {roomBlocks.map((block) => (
                <option key={block.value} value={block.value}>
                  {block.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Attendance Status</label>
            <select
              value={filters.attendanceStatus}
              onChange={(e) => handleFilterChange('attendanceStatus', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {attendanceStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-text-secondary">
          Showing <span className="font-medium text-text-primary">{totalResults}</span> students
          {hasActiveFilters && (
            <span className="ml-1">
              with active filters
            </span>
          )}
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {filters.department && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {departments.find(d => d.value === filters.department)?.label}
                </span>
              )}
              {filters.year && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {years.find(y => y.value === filters.year)?.label}
                </span>
              )}
              {filters.roomBlock && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  Block {filters.roomBlock}
                </span>
              )}
              {filters.attendanceStatus && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {attendanceStatuses.find(s => s.value === filters.attendanceStatus)?.label}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFilters;