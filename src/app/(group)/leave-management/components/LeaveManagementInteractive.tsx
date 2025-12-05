'use client';

import Icon from '@/components/ui/AppIcon';
import { useEffect, useState } from 'react';
import LeaveFilters from './LeaveFilter';
import LeaveRequestModal from './LeaveRequestModal';
import LeaveRequestTable from './LeaveRequestTable';
import LeaveRequestCard from './LeaveRequestcard';
import LeaveStatistics from './LeaveStatistics';

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

const LeaveManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Sorting states
  const [sortBy, setSortBy] = useState('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock data
  const mockRequests: LeaveRequest[] = [
  {
    id: '1',
    studentId: 'STU001',
    studentName: 'Sarah Johnson',
    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d5234dbc-1762273965593.png",
    studentImageAlt: 'Professional headshot of young woman with brown hair smiling at camera',
    department: 'Computer Science',
    roomNumber: 'A-201',
    contactNumber: '+1 (555) 123-4567',
    emergencyContact: '+1 (555) 987-6543',
    leaveType: 'sick',
    startDate: '2025-11-15',
    endDate: '2025-11-17',
    duration: 3,
    reason: 'Suffering from severe flu symptoms and need medical rest as advised by doctor.',
    status: 'pending',
    submittedAt: '2025-11-12 09:30 AM',
    priority: 'high',
    documents: [
    { name: 'Medical Certificate.pdf', url: '#', type: 'PDF' },
    { name: 'Doctor Prescription.jpg', url: '#', type: 'Image' }]

  },
  {
    id: '2',
    studentId: 'STU002',
    studentName: 'Michael Chen',
    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_180c68c82-1762274071914.png",
    studentImageAlt: 'Professional headshot of young Asian man in blue shirt smiling',
    department: 'Mechanical Engineering',
    roomNumber: 'B-105',
    contactNumber: '+1 (555) 234-5678',
    emergencyContact: '+1 (555) 876-5432',
    leaveType: 'emergency',
    startDate: '2025-11-13',
    endDate: '2025-11-15',
    duration: 3,
    reason: 'Family emergency - grandfather hospitalized, need to travel home immediately.',
    status: 'approved',
    submittedAt: '2025-11-11 02:15 PM',
    priority: 'urgent',
    approvalHistory: [
    { action: 'Approved', by: 'Dr. Smith', at: '2025-11-11 03:45 PM', comment: 'Emergency approved. Please keep us updated.' }]

  },
  {
    id: '3',
    studentId: 'STU003',
    studentName: 'Emily Rodriguez',
    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb9fc75-1762273370028.png",
    studentImageAlt: 'Professional headshot of Hispanic woman with long dark hair smiling',
    department: 'Business Administration',
    roomNumber: 'C-302',
    contactNumber: '+1 (555) 345-6789',
    emergencyContact: '+1 (555) 765-4321',
    leaveType: 'personal',
    startDate: '2025-11-20',
    endDate: '2025-11-22',
    duration: 3,
    reason: 'Sister\'s wedding ceremony - important family event that requires attendance.',
    status: 'pending',
    submittedAt: '2025-11-10 11:20 AM',
    priority: 'medium'
  },
  {
    id: '4',
    studentId: 'STU004',
    studentName: 'David Thompson',
    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1db6e688e-1762273580229.png",
    studentImageAlt: 'Professional headshot of young man with beard in casual shirt',
    department: 'Electrical Engineering',
    roomNumber: 'A-150',
    contactNumber: '+1 (555) 456-7890',
    emergencyContact: '+1 (555) 654-3210',
    leaveType: 'home',
    startDate: '2025-11-18',
    endDate: '2025-11-20',
    duration: 3,
    reason: 'Need to visit home for important family matters and document collection.',
    status: 'rejected',
    submittedAt: '2025-11-09 04:45 PM',
    priority: 'low',
    approvalHistory: [
    { action: 'Rejected', by: 'Prof. Wilson', at: '2025-11-10 10:30 AM', comment: 'Insufficient justification. Please provide more details.' }]

  },
  {
    id: '5',
    studentId: 'STU005',
    studentName: 'Lisa Wang',
    studentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc77a7e-1762274545448.png",
    studentImageAlt: 'Professional headshot of young Asian woman with short black hair smiling',
    department: 'Mathematics',
    roomNumber: 'D-201',
    contactNumber: '+1 (555) 567-8901',
    emergencyContact: '+1 (555) 543-2109',
    leaveType: 'medical',
    startDate: '2025-11-16',
    endDate: '2025-11-18',
    duration: 3,
    reason: 'Scheduled medical procedure that requires recovery time as per doctor\'s advice.',
    status: 'pending',
    submittedAt: '2025-11-08 01:30 PM',
    priority: 'high',
    documents: [
    { name: 'Hospital Appointment.pdf', url: '#', type: 'PDF' }]

  }];


  // Statistics data
  const departmentStats = [
  { department: 'Computer Science', total: 15, pending: 5, approved: 8, rejected: 2 },
  { department: 'Mechanical Eng.', total: 12, pending: 3, approved: 7, rejected: 2 },
  { department: 'Business Admin.', total: 10, pending: 4, approved: 5, rejected: 1 },
  { department: 'Electrical Eng.', total: 8, pending: 2, approved: 4, rejected: 2 },
  { department: 'Mathematics', total: 6, pending: 2, approved: 3, rejected: 1 }];


  const leaveTypeStats = [
  { type: 'sick', count: 18, percentage: 35 },
  { type: 'personal', count: 12, percentage: 24 },
  { type: 'home', count: 10, percentage: 20 },
  { type: 'emergency', count: 8, percentage: 16 },
  { type: 'medical', count: 3, percentage: 5 }];


  const monthlyTrends = [
  { month: 'Jul', requests: 25, approved: 20 },
  { month: 'Aug', requests: 30, approved: 24 },
  { month: 'Sep', requests: 28, approved: 22 },
  { month: 'Oct', requests: 35, approved: 28 },
  { month: 'Nov', requests: 32, approved: 25 }];


  // Filter and sort requests
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch = !searchTerm ||
    request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || request.status === statusFilter;
    const matchesType = !typeFilter || request.leaveType === typeFilter;
    const matchesDepartment = !departmentFilter || request.department === departmentFilter;
    const matchesPriority = !priorityFilter || request.priority === priorityFilter;

    const matchesDateRange = (!dateRange.start || request.startDate >= dateRange.start) && (
    !dateRange.end || request.endDate <= dateRange.end);

    return matchesSearch && matchesStatus && matchesType && matchesDepartment && matchesPriority && matchesDateRange;
  }).sort((a, b) => {
    const getValue = (item: LeaveRequest, key: string): string | number => {
      const val = item[key as keyof LeaveRequest];
      if (val === undefined || val === null) return '';
      if (typeof val === 'string') return val.toLowerCase();
      if (typeof val === 'number') return val;
      if (typeof val === 'boolean') return val ? 1 : 0;
      return String(val).toLowerCase();
    };

    const aValue = getValue(a, sortBy);
    const bValue = getValue(b, sortBy);

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    } else {
      const aStr = String(aValue);
      const bStr = String(bValue);
      if (sortOrder === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    }
  });

  const totalRequests = mockRequests.length;
  const pendingRequests = mockRequests.filter((r) => r.status === 'pending').length;
  const approvedRequests = mockRequests.filter((r) => r.status === 'approved').length;
  const rejectedRequests = mockRequests.filter((r) => r.status === 'rejected').length;

  const handleSelectRequest = (id: string) => {
    setSelectedRequests((prev) =>
    prev.includes(id) ?
    prev.filter((reqId) => reqId !== id) :
    [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedRequests(selected ? filteredRequests.map((r) => r.id) : []);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleApprove = async (id: string, comment?: string) => {
    // Mock API call
    console.log('Approving request:', id, comment);
    // In real app, update the request status
  };

  const handleReject = async (id: string, comment?: string) => {
    // Mock API call
    console.log('Rejecting request:', id, comment);
    // In real app, update the request status
  };

  const handleViewDetails = (id: string) => {
    const request = mockRequests.find((r) => r.id === id);
    if (request) {
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving requests:', selectedRequests);
    setSelectedRequests([]);
  };

  const handleBulkReject = () => {
    console.log('Bulk rejecting requests:', selectedRequests);
    setSelectedRequests([]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
    setDepartmentFilter('');
    setPriorityFilter('');
    setDateRange({ start: '', end: '' });
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-6 p-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Leave Management</h1>
            <p className="text-text-secondary mt-1">
              Manage student leave applications and outpass requests
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              showStatistics ?
              'bg-primary text-primary-foreground' :
              'bg-muted text-text-secondary hover:text-text-primary'}`
              }>

              <Icon name="ChartBarIcon" size={16} />
              <span className="hidden sm:inline">Statistics</span>
            </button>
            
            <div className="flex items-center bg-muted rounded-md p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors duration-200 ${
                viewMode === 'table' ? 'bg-background text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`
                }>

                <Icon name="TableCellsIcon" size={16} />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors duration-200 ${
                viewMode === 'cards' ? 'bg-background text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`
                }>

                <Icon name="Squares2X2Icon" size={16} />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        {showStatistics &&
        <LeaveStatistics
          totalRequests={totalRequests}
          pendingRequests={pendingRequests}
          approvedRequests={approvedRequests}
          rejectedRequests={rejectedRequests}
          departmentStats={departmentStats}
          leaveTypeStats={leaveTypeStats}
          monthlyTrends={monthlyTrends} />

        }

        {/* Filters */}
        <LeaveFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearFilters={clearFilters} />


        {/* Bulk Actions */}
        {selectedRequests.length > 0 &&
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircleIcon" size={20} className="text-primary" />
                <span className="text-primary font-medium">
                  {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                onClick={handleBulkReject}
                className="px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md transition-colors duration-200">

                  Bulk Reject
                </button>
                <button
                onClick={handleBulkApprove}
                className="px-4 py-2 bg-success text-success-foreground hover:bg-success/90 rounded-md transition-colors duration-200">

                  Bulk Approve
                </button>
              </div>
            </div>
          </div>
        }

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            Showing {filteredRequests.length} of {totalRequests} requests
          </span>
          <span>
            {pendingRequests} pending • {approvedRequests} approved • {rejectedRequests} rejected
          </span>
        </div>

        {/* Requests Display */}
        {viewMode === 'table' ?
        <LeaveRequestTable
          requests={filteredRequests as any}
          selectedRequests={selectedRequests}
          onSelectRequest={handleSelectRequest}
          onSelectAll={handleSelectAll}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleViewDetails}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort} /> :


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((requests) =>
          <LeaveRequestCard
            key={requests.id}
            request={requests}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleViewDetails}
            isSelected={selectedRequests.includes(requests.id)}
            onSelect={handleSelectRequest} />

          )}
          </div>
        }

        {/* Request Details Modal */}
        <LeaveRequestModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject} />

      </div>
    </div>);

};

export default LeaveManagementInteractive;