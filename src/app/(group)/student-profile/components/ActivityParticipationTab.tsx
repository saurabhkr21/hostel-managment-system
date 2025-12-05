import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ActivityMetrics {
  activity: string;
  icon: string;
  totalSessions: number;
  attended: number;
  percentage: number;
  streak: number;
  lastAttended: string;
}

interface WeeklyData {
  week: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  gym: number;
  study: number;
  sports: number;
}

interface ActivityParticipationTabProps {
  activityMetrics: ActivityMetrics[];
  weeklyData: WeeklyData[];
}

const ActivityParticipationTab = ({ activityMetrics, weeklyData }: ActivityParticipationTabProps) => {
  const COLORS = ['#2563EB', '#059669', '#DC2626', '#F59E0B', '#7C3AED', '#EC4899'];

  const pieData = activityMetrics.map((metric, index) => ({
    name: metric.activity,
    value: metric.attended,
    color: COLORS[index % COLORS.length]
  }));

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceLabel = (percentage: number) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Overall Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {Math.round(activityMetrics.reduce((sum, m) => sum + m.percentage, 0) / activityMetrics.length)}%
          </div>
          <div className="text-sm text-text-secondary">Overall Participation</div>
          <div className={`text-xs font-medium mt-1 ${getPerformanceColor(Math.round(activityMetrics.reduce((sum, m) => sum + m.percentage, 0) / activityMetrics.length))}`}>
            {getPerformanceLabel(Math.round(activityMetrics.reduce((sum, m) => sum + m.percentage, 0) / activityMetrics.length))}
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-success mb-2">
            {activityMetrics.reduce((sum, m) => sum + m.attended, 0)}
          </div>
          <div className="text-sm text-text-secondary">Total Sessions Attended</div>
          <div className="text-xs text-text-secondary mt-1">
            out of {activityMetrics.reduce((sum, m) => sum + m.totalSessions, 0)} sessions
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-warning mb-2">
            {Math.max(...activityMetrics.map(m => m.streak))}
          </div>
          <div className="text-sm text-text-secondary">Best Streak</div>
          <div className="text-xs text-text-secondary mt-1">
            Current: {activityMetrics.find(m => m.streak === Math.max(...activityMetrics.map(m => m.streak)))?.activity}
          </div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="ChartBarIcon" size={20} />
          Activity Breakdown
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {activityMetrics.map((metric, index) => (
            <div key={metric.activity} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={metric.icon as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{metric.activity}</h4>
                    <p className="text-sm text-text-secondary">
                      {metric.attended}/{metric.totalSessions} sessions
                    </p>
                  </div>
                </div>
                <div className={`text-right ${getPerformanceColor(metric.percentage)}`}>
                  <div className="text-lg font-bold">{metric.percentage}%</div>
                  <div className="text-xs">{getPerformanceLabel(metric.percentage)}</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary">{metric.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-text-secondary">Streak: </span>
                  <span className="font-medium text-warning">{metric.streak} days</span>
                </div>
                <div>
                  <span className="text-text-secondary">Last: </span>
                  <span className="font-medium text-text-primary">{metric.lastAttended}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Distribution */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="ChartPieIcon" size={20} />
            Participation Distribution
          </h3>
          
          <div className="h-64" aria-label="Activity Participation Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} sessions`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-text-secondary">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="ChartBarIcon" size={20} />
            Weekly Attendance Trends
          </h3>
          
          <div className="h-64" aria-label="Weekly Attendance Trends Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="breakfast" fill="#2563EB" name="Breakfast" />
                <Bar dataKey="lunch" fill="#059669" name="Lunch" />
                <Bar dataKey="dinner" fill="#DC2626" name="Dinner" />
                <Bar dataKey="gym" fill="#F59E0B" name="Gym" />
                <Bar dataKey="study" fill="#7C3AED" name="Study" />
                <Bar dataKey="sports" fill="#EC4899" name="Sports" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="LightBulbIcon" size={20} />
          Performance Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrophyIcon" size={16} className="text-success" />
              <span className="font-medium text-success">Strengths</span>
            </div>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Excellent meal attendance (95%+)</li>
              <li>• Consistent study hours participation</li>
              <li>• Strong current streak in gym activities</li>
            </ul>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="ExclamationTriangleIcon" size={16} className="text-warning" />
              <span className="font-medium text-warning">Areas for Improvement</span>
            </div>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Sports participation could be increased</li>
              <li>• Weekend gym attendance is lower</li>
              <li>• Occasional late arrivals to breakfast</li>
            </ul>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="ChartBarIcon" size={16} className="text-primary" />
              <span className="font-medium text-primary">Recommendations</span>
            </div>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Join weekend sports activities</li>
              <li>• Set earlier wake-up reminders</li>
              <li>• Consider group study sessions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityParticipationTab;