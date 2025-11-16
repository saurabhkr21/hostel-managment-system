"use client";

import { useEffect, useState } from "react";

import Icon from "@/components/ui/AppIcon";
import BulkActions from "./BulkActions";
import DepartmentStats from "./DepartmentStats";
import StudentFilters from "./StudentFilters";
import StudentProfileModal from "./StudentProfileModal";
import StudentTable from "./StudentTable";

interface FilterOptions {
  department: string;
  year: string;
  roomBlock: string;
  attendanceStatus: string;
  searchQuery: string;
}

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
  attendanceStatus: "present" | "absent" | "late" | "on-leave";
  lastActivity: string;
  parentContact: boolean;
  joinDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalInfo: {
    bloodGroup: string;
    allergies: string[];
    medications: string[];
  };
}

interface DepartmentStat {
  department: string;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  onLeave: number;
  occupancyRate: number;
  color: string;
}

const StudentManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    department: "",
    year: "",
    roomBlock: "",
    attendanceStatus: "",
    searchQuery: "",
  });
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.department)
        queryParams.append("department", filters.department);
      if (filters.year) queryParams.append("year", filters.year);
      if (filters.roomBlock) queryParams.append("roomBlock", filters.roomBlock);
      if (filters.attendanceStatus)
        queryParams.append("attendanceStatus", filters.attendanceStatus);
      if (filters.searchQuery)
        queryParams.append("searchQuery", filters.searchQuery);

      const response = await fetch(`/api/students?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load students");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHydrated) {
      fetchStudents();
    }
  }, [filters, isHydrated]);

  const mockStudents: Student[] = [
    {
      id: "1",
      name: "Alex Johnson",
      studentId: "STU001",
      email: "alex.johnson@university.edu",
      department: "Computer Science",
      year: 3,
      roomNumber: "101",
      roomBlock: "A",
      phone: "+1 (555) 123-4567",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      alt: "Young man with short brown hair wearing casual blue shirt smiling at camera",
      attendanceStatus: "present",
      lastActivity: "2 hours ago",
      parentContact: true,
      joinDate: "September 15, 2022",
      emergencyContact: {
        name: "Sarah Johnson",
        relationship: "Mother",
        phone: "+1 (555) 987-6543",
        email: "sarah.johnson@email.com",
      },
      address: {
        street: "123 Oak Street",
        city: "Springfield",
        state: "IL",
        zipCode: "62701",
      },
      medicalInfo: {
        bloodGroup: "O+",
        allergies: ["Peanuts", "Shellfish"],
        medications: ["Inhaler"],
      },
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      studentId: "STU002",
      email: "maria.rodriguez@university.edu",
      department: "Electrical Engineering",
      year: 2,
      roomNumber: "205",
      roomBlock: "B",
      phone: "+1 (555) 234-5678",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      alt: "Young Hispanic woman with long dark hair wearing white blouse smiling professionally",
      attendanceStatus: "absent",
      lastActivity: "1 day ago",
      parentContact: false,
      joinDate: "August 20, 2023",
      emergencyContact: {
        name: "Carlos Rodriguez",
        relationship: "Father",
        phone: "+1 (555) 876-5432",
        email: "carlos.rodriguez@email.com",
      },
      address: {
        street: "456 Pine Avenue",
        city: "Madison",
        state: "WI",
        zipCode: "53703",
      },
      medicalInfo: {
        bloodGroup: "A+",
        allergies: ["Latex"],
        medications: [],
      },
    },
    {
      id: "3",
      name: "David Chen",
      studentId: "STU003",
      email: "david.chen@university.edu",
      department: "Mechanical Engineering",
      year: 4,
      roomNumber: "312",
      roomBlock: "C",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
      alt: "Asian man with black hair wearing dark blue sweater looking confident",
      attendanceStatus: "late",
      lastActivity: "30 minutes ago",
      parentContact: true,
      joinDate: "September 1, 2021",
      emergencyContact: {
        name: "Linda Chen",
        relationship: "Mother",
        phone: "+1 (555) 765-4321",
        email: "linda.chen@email.com",
      },
      address: {
        street: "789 Maple Drive",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
      },
      medicalInfo: {
        bloodGroup: "B+",
        allergies: [],
        medications: ["Vitamins"],
      },
    },
    {
      id: "4",
      name: "Emily Davis",
      studentId: "STU004",
      email: "emily.davis@university.edu",
      department: "Civil Engineering",
      year: 1,
      roomNumber: "150",
      roomBlock: "A",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1658497735599-1834bfa6ccaa",
      alt: "Young blonde woman with shoulder-length hair wearing light blue top smiling warmly",
      attendanceStatus: "present",
      lastActivity: "1 hour ago",
      parentContact: true,
      joinDate: "August 25, 2024",
      emergencyContact: {
        name: "Robert Davis",
        relationship: "Father",
        phone: "+1 (555) 654-3210",
        email: "robert.davis@email.com",
      },
      address: {
        street: "321 Elm Street",
        city: "Denver",
        state: "CO",
        zipCode: "80202",
      },
      medicalInfo: {
        bloodGroup: "AB+",
        allergies: ["Dust"],
        medications: ["Allergy medication"],
      },
    },
    {
      id: "5",
      name: "James Wilson",
      studentId: "STU005",
      email: "james.wilson@university.edu",
      department: "Business Administration",
      year: 2,
      roomNumber: "220",
      roomBlock: "D",
      phone: "+1 (555) 567-8901",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      alt: "African American man with short hair wearing navy blue shirt with friendly expression",
      attendanceStatus: "on-leave",
      lastActivity: "3 days ago",
      parentContact: false,
      joinDate: "January 10, 2023",
      emergencyContact: {
        name: "Patricia Wilson",
        relationship: "Mother",
        phone: "+1 (555) 543-2109",
        email: "patricia.wilson@email.com",
      },
      address: {
        street: "654 Cedar Lane",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
      },
      medicalInfo: {
        bloodGroup: "O-",
        allergies: ["Penicillin"],
        medications: [],
      },
    },
  ];

  const departmentStats: DepartmentStat[] = [
    {
      department: "Computer Science",
      totalStudents: 85,
      presentToday: 78,
      absentToday: 5,
      onLeave: 2,
      occupancyRate: 92,
      color: "bg-blue-500",
    },
    {
      department: "Electrical Engineering",
      totalStudents: 72,
      presentToday: 65,
      absentToday: 4,
      onLeave: 3,
      occupancyRate: 88,
      color: "bg-green-500",
    },
    {
      department: "Mechanical Engineering",
      totalStudents: 68,
      presentToday: 60,
      absentToday: 6,
      onLeave: 2,
      occupancyRate: 85,
      color: "bg-orange-500",
    },
    {
      department: "Civil Engineering",
      totalStudents: 55,
      presentToday: 50,
      absentToday: 3,
      onLeave: 2,
      occupancyRate: 78,
      color: "bg-purple-500",
    },
    {
      department: "Business Administration",
      totalStudents: 45,
      presentToday: 40,
      absentToday: 3,
      onLeave: 2,
      occupancyRate: 82,
      color: "bg-red-500",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      !filters.searchQuery ||
      student.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      student.studentId
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesDepartment =
      !filters.department ||
      student.department.toLowerCase().replace(/\s+/g, "-") ===
        filters.department;
    const matchesYear =
      !filters.year || student.year.toString() === filters.year;
    const matchesRoomBlock =
      !filters.roomBlock || student.roomBlock === filters.roomBlock;
    const matchesAttendanceStatus =
      !filters.attendanceStatus ||
      student.attendanceStatus === filters.attendanceStatus;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesYear &&
      matchesRoomBlock &&
      matchesAttendanceStatus
    );
  });

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedStudents(selected ? filteredStudents.map((s) => s.id) : []);
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleQuickAction = (action: string, studentId: string) => {
    console.log(`Quick action: ${action} for student: ${studentId}`);
    // Handle quick actions here
  };

  const handleBulkAction = (action: string, data?: any) => {
    console.log(`Bulk action: ${action}`, data);
    // Handle bulk actions here
    setSelectedStudents([]);
  };

  const handleEditStudent = (studentId: string) => {
    console.log(`Edit student: ${studentId}`);
    setIsProfileModalOpen(false);
  };

  const handleContactParent = (studentId: string) => {
    console.log(`Contact parent for student: ${studentId}`);
    setIsProfileModalOpen(false);
  };

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <div className="flex-1 ml-0 md:ml-240">
            <div className="pt-16 md:pt-20 px-6 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
                <div className="h-32 bg-muted rounded mb-6"></div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <div className="flex-1 ml-0 md:ml-240">
            <div className="pt-16 md:pt-20 px-6 py-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-destructive mb-2">
                  Error Loading Students
                </h2>
                <p className="text-text-secondary mb-4">{error}</p>
                <button
                  onClick={fetchStudents}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 ml-0 md:ml-240">
          <div className="pt-16 md:pt-20 px-6 py-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Student Management
                </h1>
                <p className="text-text-secondary">
                  Manage student records, track attendance, and maintain
                  comprehensive profiles
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <button
                  onClick={() => setShowAddStudentForm(true)}
                  className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                  <Icon name="PlusIcon" size={16} className="mr-2" />
                  Add New Student
                </button>

                <button className="flex items-center px-4 py-2 border border-border text-text-secondary hover:text-text-primary hover:bg-accent rounded-md transition-colors duration-200">
                  <Icon
                    name="DocumentArrowDownIcon"
                    size={16}
                    className="mr-2"
                  />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Content Area */}
              <div className="xl:col-span-3 space-y-6">
                <StudentFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  totalResults={filteredStudents.length}
                />

                <StudentTable
                  students={filteredStudents}
                  selectedStudents={selectedStudents}
                  onStudentSelect={handleStudentSelect}
                  onSelectAll={handleSelectAll}
                  onStudentClick={handleStudentClick as any}
                  onQuickAction={handleQuickAction}
                />
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-1">
                <DepartmentStats stats={departmentStats} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedStudents.length}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedStudents([])}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        student={selectedStudent}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onEdit={handleEditStudent}
        onContactParent={handleContactParent}
      />
    </div>
  );
};

export default StudentManagementInteractive;
