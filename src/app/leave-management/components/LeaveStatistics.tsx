import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LeaveStatisticsProps {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  departmentStats: Array<{
    department: string;
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  }>;
  leaveTypeStats: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    requests: number;
    approved: number;
  }>;
}

const LeaveStatistics = ({
  totalRequests,
  pendingRequests,
  approvedRequests,
  rejectedRequests,
  departmentStats,
  leaveTypeStats,
  monthlyTrends
}: LeaveStatisticsProps) => {
  const approvalRate = totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0;
  const pendingRate = totalRequests > 0 ? Math.round((pendingRequests / totalRequests) * 100) : 0;

  const pieColors = ['#2563EB', '#059669', '#DC2626', '#F59E0B', '#8B5CF6'];

  const stats = [
    {
      label: 'Total Requests',
      value: totalRequests,
      icon: 'DocumentTextIcon',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Pending',
      value: pendingRequests,
      icon: 'ClockIcon',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Approved',
      value: approvedRequests,
      icon: 'CheckCircleIcon',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Rejected',
      value: rejectedRequests,
      icon: 'XCircleIcon',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon name={stat.icon as any} size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-medium text-text-primary mb-4">Approval Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">Approval Rate</span>
                <span className="text-sm font-medium text-success">{approvalRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${approvalRate}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">Pending Rate</span>
                <span className="text-sm font-medium text-warning">{pendingRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pendingRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-medium text-text-primary mb-4">Leave Types Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveTypeStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {leaveTypeStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `${value} requests (${props.payload.percentage}%)`,
                    props.payload.type.charAt(0).toUpperCase() + props.payload.type.slice(1)
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-text-primary mb-4">Department-wise Requests</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="department" 
                stroke="#64748B"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Pending" />
              <Bar dataKey="approved" stackId="a" fill="#10B981" name="Approved" />
              <Bar dataKey="rejected" stackId="a" fill="#EF4444" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-text-primary mb-4">Monthly Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="requests" fill="#2563EB" name="Total Requests" />
              <Bar dataKey="approved" fill="#10B981" name="Approved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
            <Icon name="DocumentArrowDownIcon" size={16} />
            <span className="text-sm font-medium">Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-md hover:bg-success/90 transition-colors duration-200">
            <Icon name="CheckIcon" size={16} />
            <span className="text-sm font-medium">Bulk Approve</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-warning text-warning-foreground rounded-md hover:bg-warning/90 transition-colors duration-200">
            <Icon name="BellIcon" size={16} />
            <span className="text-sm font-medium">Send Reminders</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors duration-200">
            <Icon name="CogIcon" size={16} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatistics;