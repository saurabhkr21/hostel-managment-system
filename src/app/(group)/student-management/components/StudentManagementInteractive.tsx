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

// --- SAFE helpers
const safeStr = (v: any) => (v == null ? "" : String(v));
const safeLower = (v: any) => safeStr(v).toLowerCase();

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

  const normalizeStudent = (d: any): Student => {
    // ensure strings are never null, ensure year is number etc.
    return {
      id: String(d?.id ?? ""),
      name: safeStr(d?.name),
      studentId: safeStr(d?.studentId),
      email: safeStr(d?.email),
      department: safeStr(d?.department),
      year: Number(d?.year ?? 0),
      roomNumber: safeStr(d?.roomNumber),
      roomBlock: safeStr(d?.roomBlock),
      phone: safeStr(d?.phone),
      avatar: safeStr(d?.avatar),
      alt: safeStr(d?.alt),
      attendanceStatus: (d?.attendanceStatus ?? "absent") as
        | "present"
        | "absent"
        | "late"
        | "on-leave",
      lastActivity: safeStr(d?.lastActivity),
      parentContact: Boolean(d?.parentContact),
      joinDate: safeStr(d?.joinDate),
      emergencyContact: {
        name: safeStr(d?.emergencyContact?.name),
        relationship: safeStr(d?.emergencyContact?.relationship),
        phone: safeStr(d?.emergencyContact?.phone),
        email: safeStr(d?.emergencyContact?.email),
      },
      address: {
        street: safeStr(d?.address?.street),
        city: safeStr(d?.address?.city),
        state: safeStr(d?.address?.state),
        zipCode: safeStr(d?.address?.zipCode),
      },
      medicalInfo: {
        bloodGroup: safeStr(d?.medicalInfo?.bloodGroup),
        allergies: Array.isArray(d?.medicalInfo?.allergies)
          ? d.medicalInfo.allergies
          : [],
        medications: Array.isArray(d?.medicalInfo?.medications)
          ? d.medicalInfo.medications
          : [],
      },
    };
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.department) queryParams.append("department", filters.department);
      if (filters.year) queryParams.append("year", filters.year);
      if (filters.roomBlock) queryParams.append("roomBlock", filters.roomBlock);
      if (filters.attendanceStatus)
        queryParams.append("attendanceStatus", filters.attendanceStatus);
      if (filters.searchQuery)
        queryParams.append("searchQuery", filters.searchQuery);

      const response = await fetch(`/api/students?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();

      // Normalize every student to guarantee fields are strings (no nulls)
      const normalized = Array.isArray(data)
        ? data.map(normalizeStudent)
        : [];
      setStudents(normalized);

      // Optional: log any items originally with nulls (quick debug)
      const hadNull = (data || []).find((s: any) =>
        [s?.name, s?.studentId, s?.email, s?.department].some((v) => v == null)
      );
      if (hadNull) {
        console.warn("API returned student(s) with null important fields", hadNull);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isHydrated]);

  // --- Use safe helpers in filter logic
  const q = safeLower(filters.searchQuery);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      !q ||
      safeLower(student.name).includes(q) ||
      safeLower(student.studentId).includes(q) ||
      safeLower(student.email).includes(q);

    const matchesDepartment =
      !filters.department ||
      safeLower(student.department).replace(/\s+/g, "-") === filters.department;

    const matchesYear = !filters.year || student.year.toString() === filters.year;

    const matchesRoomBlock =
      !filters.roomBlock || safeStr(student.roomBlock) === filters.roomBlock;

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

  // Rest of your handlers unchanged...
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
  };

  const handleBulkAction = (action: string, data?: any) => {
    console.log(`Bulk action: ${action}`, data);
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

  // ... render UI unchanged (omitted here to keep snippet concise)
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="flex-1 ml-0 md:ml-60">
          <div className="pt-16 md:pt-20 px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Student Management
                </h1>
                <p className="text-text-secondary">
                  Manage student records, track attendance, and maintain comprehensive profiles
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
                  <Icon name="DocumentArrowDownIcon" size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
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

              <div className="xl:col-span-1">
                <DepartmentStats stats={[] as any} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BulkActions
        selectedCount={selectedStudents.length}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedStudents([])}
      />

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
