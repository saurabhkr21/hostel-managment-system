'use client';

import React, { useState, useEffect } from 'react';
import ActivityTabs from './ActivityTabs';
import StudentRoster from './StudentRoster';
import TodaySchedule from './TodaySchedule';
import AttendanceStats from './AttendanceStats';
import SessionControls from './SessionControls';
import AIInsights from './AllInsights';

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

interface Activity {
  id: string;
  name: string;
  icon: string;
  currentSession: string;
  participantCount: number;
  totalExpected: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface ScheduleItem {
  id: string;
  activity: string;
  timeSlot: string;
  expectedParticipants: number;
  actualParticipants: number;
  status: 'completed' | 'active' | 'upcoming';
  location: string;
}

interface AIAlert {
  id: string;
  studentName: string;
  pattern: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  daysCount: number;
}

const AttendanceTrackingInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('meals');
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [sessionStatus, setSessionStatus] = useState<'active' | 'completed' | 'not-started'>('active');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockActivities: Activity[] = [
  {
    id: 'meals',
    name: 'Meals',
    icon: 'CakeIcon',
    currentSession: 'Lunch - 12:30 PM',
    participantCount: 142,
    totalExpected: 180,
    status: 'active'
  },
  {
    id: 'gym',
    name: 'Gym',
    icon: 'HeartIcon',
    currentSession: 'Evening Session - 5:00 PM',
    participantCount: 45,
    totalExpected: 60,
    status: 'upcoming'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'TrophyIcon',
    currentSession: 'Basketball - 4:00 PM',
    participantCount: 28,
    totalExpected: 32,
    status: 'active'
  },
  {
    id: 'study',
    name: 'Study Hours',
    icon: 'BookOpenIcon',
    currentSession: 'Evening Study - 7:00 PM',
    participantCount: 0,
    totalExpected: 180,
    status: 'upcoming'
  }];


  const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    room: 'A-101',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d90e6d7c-1762274277319.png",
    alt: 'Young Indian male student with short black hair wearing blue shirt smiling at camera',
    isPresent: true,
    arrivalTime: '12:25 PM'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rollNumber: 'EC2021015',
    department: 'Electronics',
    room: 'B-205',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11537124d-1762273708026.png",
    alt: 'Young Indian female student with long black hair wearing white top smiling professionally',
    isPresent: false
  },
  {
    id: '3',
    name: 'Arjun Patel',
    rollNumber: 'ME2021032',
    department: 'Mechanical',
    room: 'C-112',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_113da4909-1762273380012.png",
    alt: 'Young Indian male student with neat haircut wearing formal shirt looking confident',
    isPresent: true,
    arrivalTime: '12:35 PM',
    lateArrival: true
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    rollNumber: 'IT2021008',
    department: 'Information Technology',
    room: 'A-203',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb23337d-1762274275888.png",
    alt: 'Young Indian female student with shoulder-length hair wearing casual top with friendly expression',
    isPresent: true,
    arrivalTime: '12:20 PM'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    rollNumber: 'EE2021025',
    department: 'Electrical',
    room: 'D-108',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb23337d-1762274275888.png",
    alt: 'Young Indian male student with styled hair wearing dark shirt with serious expression',
    isPresent: false
  },
  {
    id: '6',
    name: 'Ananya Gupta',
    rollNumber: 'CH2021019',
    department: 'Chemical',
    room: 'B-301',
    avatar: "https://images.unsplash.com/photo-1652396944757-ad27b62b33f6",
    alt: 'Young Indian female student with curly hair wearing colorful top with bright smile',
    isPresent: true,
    arrivalTime: '12:30 PM'
  }];


  const mockSchedule: ScheduleItem[] = [
  {
    id: '1',
    activity: 'Breakfast',
    timeSlot: '7:00 AM - 9:00 AM',
    expectedParticipants: 180,
    actualParticipants: 165,
    status: 'completed',
    location: 'Main Dining Hall'
  },
  {
    id: '2',
    activity: 'Lunch',
    timeSlot: '12:30 PM - 2:00 PM',
    expectedParticipants: 180,
    actualParticipants: 142,
    status: 'active',
    location: 'Main Dining Hall'
  },
  {
    id: '3',
    activity: 'Basketball',
    timeSlot: '4:00 PM - 5:30 PM',
    expectedParticipants: 32,
    actualParticipants: 28,
    status: 'active',
    location: 'Sports Complex'
  },
  {
    id: '4',
    activity: 'Gym Session',
    timeSlot: '5:00 PM - 7:00 PM',
    expectedParticipants: 60,
    actualParticipants: 0,
    status: 'upcoming',
    location: 'Fitness Center'
  },
  {
    id: '5',
    activity: 'Study Hours',
    timeSlot: '7:00 PM - 9:00 PM',
    expectedParticipants: 180,
    actualParticipants: 0,
    status: 'upcoming',
    location: 'Study Hall'
  },
  {
    id: '6',
    activity: 'Dinner',
    timeSlot: '7:30 PM - 9:30 PM',
    expectedParticipants: 180,
    actualParticipants: 0,
    status: 'upcoming',
    location: 'Main Dining Hall'
  }];


  const mockAIAlerts: AIAlert[] = [
  {
    id: '1',
    studentName: 'Vikram Singh',
    pattern: 'Missed 4 consecutive lunch sessions',
    severity: 'high',
    recommendation: 'Immediate intervention recommended. Contact student and parents.',
    daysCount: 4
  },
  {
    id: '2',
    studentName: 'Priya Sharma',
    pattern: 'Irregular gym attendance pattern detected',
    severity: 'medium',
    recommendation: 'Monitor for health or schedule conflicts.',
    daysCount: 7
  },
  {
    id: '3',
    studentName: 'Rohit Mehta',
    pattern: 'Consistently late for study hours',
    severity: 'low',
    recommendation: 'Gentle reminder about punctuality may help.',
    daysCount: 5
  }];


  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const handleAttendanceToggle = (studentId: string) => {
    setStudents((prev) => prev.map((student) =>
    student.id === studentId ?
    {
      ...student,
      isPresent: !student.isPresent,
      arrivalTime: !student.isPresent ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      lateArrival: false
    } :
    student
    ));
  };

  const handleBulkSelect = (studentIds: string[], isPresent: boolean) => {
    setStudents((prev) => prev.map((student) =>
    studentIds.includes(student.id) ?
    {
      ...student,
      isPresent,
      arrivalTime: isPresent ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
      lateArrival: false
    } :
    student
    ));
  };

  const handleStartSession = () => {
    setSessionStatus('active');
  };

  const handleCompleteSession = () => {
    setSessionStatus('completed');
  };

  const handleSendNotifications = () => {
    // Mock notification sending
    console.log('Sending notifications to parents of absent students');
  };

  const handleExportData = () => {
    // Mock data export
    console.log('Exporting attendance data');
  };

  const handleDismissAlert = (alertId: string) => {
    // Mock alert dismissal
    console.log('Dismissing alert:', alertId);
  };

  const handleSendParentNotification = (studentName: string) => {
    // Mock parent notification
    console.log('Sending parent notification for:', studentName);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) =>
            <div key={i} className="h-24 bg-muted rounded"></div>
            )}
          </div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>);

  }

  const currentActivity = mockActivities.find((activity) => activity.id === activeTab);
  const presentStudents = students.filter((s) => s.isPresent).length;
  const absentStudents = students.length - presentStudents;
  const lateArrivals = students.filter((s) => s.lateArrival).length;
  const participationRate = Math.round(presentStudents / students.length * 100);

  return (
    <div className="space-y-6">
      {/* Activity Tabs */}
      <ActivityTabs
        activities={mockActivities}
        activeTab={activeTab}
        onTabChange={setActiveTab} />


      {/* Attendance Statistics */}
      <AttendanceStats
        totalStudents={students.length}
        presentStudents={presentStudents}
        absentStudents={absentStudents}
        lateArrivals={lateArrivals}
        participationRate={participationRate}
        aiAlertsCount={mockAIAlerts.length} />


      {/* Session Controls */}
      <SessionControls
        currentActivity={currentActivity?.name || 'Unknown Activity'}
        sessionStatus={sessionStatus}
        onStartSession={handleStartSession}
        onCompleteSession={handleCompleteSession}
        onSendNotifications={handleSendNotifications}
        onExportData={handleExportData} />


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Roster - Takes 2 columns */}
        <div className="lg:col-span-2">
          <StudentRoster
            students={students}
            onAttendanceToggle={handleAttendanceToggle}
            onBulkSelect={handleBulkSelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery} />

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <TodaySchedule scheduleItems={mockSchedule} />

          {/* AI Insights */}
          <AIInsights
            alerts={mockAIAlerts}
            onDismissAlert={handleDismissAlert}
            onSendParentNotification={handleSendParentNotification} />

        </div>
      </div>
    </div>);

};

export default AttendanceTrackingInteractive;