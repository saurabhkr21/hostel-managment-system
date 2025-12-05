'use client';

import React, { useState, useEffect } from 'react';
import StudentHeader from './StudentHeader';
import PersonalDetailsTab from './PersonalDetailsTab';
import AttendanceHistoryTab from './AttendanceHistoryTab';
import LeaveRecordsTab from './LeaveRecordsTab';
import ActivityParticipationTab from './ActivityParticipationTab';
import ParentCommunicationsTab from './ParentCommunicationsTab';
import Icon from '@/components/ui/AppIcon';

interface StudentProfileInteractiveProps {

  // All props are data-only, no functions
}
const StudentProfileInteractive = ({}: StudentProfileInteractiveProps) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock data - in real app would come from props or API
  const mockStudent = {
    id: "STU001",
    name: "Alex Johnson",
    studentId: "HS2024001",
    department: "Computer Science",
    year: "3rd Year",
    room: "A-204",
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@university.edu",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d67f557b-1762249150720.png",
    profileImageAlt: "Professional headshot of young man with brown hair wearing navy blue shirt smiling at camera",
    status: "active" as const,
    joinDate: "Aug 2022",
    emergencyContact: {
      name: "Sarah Johnson",
      relation: "Mother",
      phone: "+1 (555) 987-6543"
    }
  };

  const mockPersonalDetails = {
    dateOfBirth: "2001-03-15",
    bloodGroup: "O+",
    address: "123 Main Street, Apartment 4B",
    city: "Springfield",
    state: "Illinois",
    pincode: "62701",
    parentName: "Sarah Johnson",
    parentPhone: "+1 (555) 987-6543",
    parentEmail: "sarah.johnson@email.com",
    guardianName: "Michael Johnson",
    guardianPhone: "+1 (555) 987-6544",
    medicalConditions: "None",
    allergies: "Peanuts, Shellfish",
    medications: "None"
  };

  const mockAttendanceRecords = [
  {
    date: "2024-11-12",
    activities: {
      breakfast: "present" as const,
      lunch: "present" as const,
      dinner: "late" as const,
      gym: "present" as const,
      study: "present" as const,
      sports: "absent" as const
    }
  },
  {
    date: "2024-11-11",
    activities: {
      breakfast: "present" as const,
      lunch: "present" as const,
      dinner: "present" as const,
      gym: "absent" as const,
      study: "present" as const,
      sports: "present" as const
    }
  },
  {
    date: "2024-11-10",
    activities: {
      breakfast: "late" as const,
      lunch: "present" as const,
      dinner: "present" as const,
      gym: "present" as const,
      study: "present" as const,
      sports: "present" as const
    }
  }];


  const mockAttendanceStats = {
    totalDays: 90,
    presentDays: 82,
    absentDays: 8,
    currentStreak: 5,
    longestStreak: 15,
    attendancePercentage: 91
  };

  const mockLeaveRecords = [
  {
    id: "LV001",
    type: "sick" as const,
    startDate: "2024-11-08",
    endDate: "2024-11-10",
    duration: 3,
    reason: "Fever and flu symptoms. Doctor advised rest for 3 days.",
    status: "approved" as const,
    appliedDate: "2024-11-07",
    approvedBy: "Dr. Smith",
    approvedDate: "2024-11-07",
    documents: ["medical_certificate.pdf"]
  },
  {
    id: "LV002",
    type: "home" as const,
    startDate: "2024-10-25",
    endDate: "2024-10-27",
    duration: 3,
    reason: "Family wedding ceremony. Need to attend important family function.",
    status: "approved" as const,
    appliedDate: "2024-10-20",
    approvedBy: "Prof. Davis",
    approvedDate: "2024-10-21"
  },
  {
    id: "LV003",
    type: "personal" as const,
    startDate: "2024-12-15",
    endDate: "2024-12-16",
    duration: 2,
    reason: "Personal work in hometown. Need to handle some important documents.",
    status: "pending" as const,
    appliedDate: "2024-11-12"
  }];


  const mockActivityMetrics = [
  {
    activity: "Breakfast",
    icon: "SunIcon",
    totalSessions: 90,
    attended: 85,
    percentage: 94,
    streak: 12,
    lastAttended: "Today"
  },
  {
    activity: "Lunch",
    icon: "ClockIcon",
    totalSessions: 90,
    attended: 88,
    percentage: 98,
    streak: 15,
    lastAttended: "Today"
  },
  {
    activity: "Dinner",
    icon: "MoonIcon",
    totalSessions: 90,
    attended: 82,
    percentage: 91,
    streak: 8,
    lastAttended: "Yesterday"
  },
  {
    activity: "Gym",
    icon: "FireIcon",
    totalSessions: 60,
    attended: 45,
    percentage: 75,
    streak: 3,
    lastAttended: "Today"
  },
  {
    activity: "Study Hours",
    icon: "BookOpenIcon",
    totalSessions: 90,
    attended: 78,
    percentage: 87,
    streak: 5,
    lastAttended: "Today"
  },
  {
    activity: "Sports",
    icon: "TrophyIcon",
    totalSessions: 45,
    attended: 28,
    percentage: 62,
    streak: 2,
    lastAttended: "2 days ago"
  }];


  const mockWeeklyData = [
  { week: "Week 1", breakfast: 6, lunch: 7, dinner: 6, gym: 4, study: 6, sports: 3 },
  { week: "Week 2", breakfast: 7, lunch: 7, dinner: 7, gym: 5, study: 7, sports: 4 },
  { week: "Week 3", breakfast: 6, lunch: 7, dinner: 6, gym: 3, study: 6, sports: 2 },
  { week: "Week 4", breakfast: 7, lunch: 7, dinner: 7, gym: 5, study: 7, sports: 4 }];


  const mockCommunications = [
  {
    id: "COM001",
    type: "automated" as const,
    subject: "Daily Attendance Summary - November 12, 2024",
    message: "Your child Alex Johnson attended all scheduled activities today except sports. Overall attendance: 83%. Current streak: 5 days.",
    timestamp: "2024-11-12T18:00:00Z",
    recipient: "sarah.johnson@email.com",
    status: "read" as const,
    category: "attendance" as const,
    priority: "low" as const
  },
  {
    id: "COM002",
    type: "alert" as const,
    subject: "Leave Application Approved",
    message: "Alex Johnson's sick leave application for November 8-10, 2024 has been approved. Please ensure proper rest and recovery.",
    timestamp: "2024-11-07T14:30:00Z",
    recipient: "sarah.johnson@email.com",
    status: "read" as const,
    category: "leave" as const,
    priority: "medium" as const
  },
  {
    id: "COM003",
    type: "manual" as const,
    subject: "Excellent Academic Performance",
    message: "We\'re pleased to inform you that Alex has shown exceptional performance in study hours with 87% attendance. Keep up the great work!",
    timestamp: "2024-11-05T10:15:00Z",
    recipient: "sarah.johnson@email.com",
    status: "delivered" as const,
    category: "academic" as const,
    priority: "low" as const
  }];


  const tabs = [
  { id: 'personal', label: 'Personal Details', icon: 'UserIcon' },
  { id: 'attendance', label: 'Attendance History', icon: 'ClipboardDocumentCheckIcon' },
  { id: 'leave', label: 'Leave Records', icon: 'CalendarDaysIcon' },
  { id: 'activity', label: 'Activity Participation', icon: 'ChartBarIcon' },
  { id: 'communications', label: 'Parent Communications', icon: 'ChatBubbleLeftRightIcon' }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="bg-surface border border-border rounded-lg p-6 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-muted rounded-lg"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex space-x-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) =>
              <div key={i} className="h-10 bg-muted rounded w-32"></div>
              )}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) =>
              <div key={i} className="h-16 bg-muted rounded"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Student Header */}
        <StudentHeader student={mockStudent} />

        {/* Tab Navigation */}
        <div className="bg-surface border border-border rounded-lg mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id ?
                'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'}
                  `
                }>

                  <Icon name={tab.icon as any} size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' &&
            <PersonalDetailsTab details={mockPersonalDetails} />
            }
            {activeTab === 'attendance' &&
            <AttendanceHistoryTab
              attendanceRecords={mockAttendanceRecords}
              stats={mockAttendanceStats} />

            }
            {activeTab === 'leave' &&
            <LeaveRecordsTab leaveRecords={mockLeaveRecords} />
            }
            {activeTab === 'activity' &&
            <ActivityParticipationTab
              activityMetrics={mockActivityMetrics}
              weeklyData={mockWeeklyData} />

            }
            {activeTab === 'communications' &&
            <ParentCommunicationsTab communications={mockCommunications} />
            }
          </div>
        </div>
      </div>
    </div>);

};

export default StudentProfileInteractive;