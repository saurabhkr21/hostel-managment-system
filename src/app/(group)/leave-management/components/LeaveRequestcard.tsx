"use client";

import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentImage: string;
  studentImageAlt: string;
  department: string;
  leaveType: "sick" | "emergency" | "personal" | "home" | "medical";
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "expired";
  submittedAt: string;
  priority: "low" | "medium" | "high" | "urgent";
  // fixed: documents is an array of objects (matches mockRequests)
  documents?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

interface LeaveRequestCardProps {
  request: LeaveRequest;
  // fixed: handlers accept optional comment like parent handlers
  onApprove: (id: string, comment?: string) => void;
  onReject: (id: string, comment?: string) => void;
  onViewDetails: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const LeaveRequestCard = ({
  request,
  onApprove,
  onReject,
  onViewDetails,
  isSelected,
  onSelect,
}: LeaveRequestCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "approved":
        return "bg-success/10 text-success border-success/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "expired":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-primary text-primary-foreground";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case "sick":
        return "HeartIcon";
      case "emergency":
        return "ExclamationTriangleIcon";
      case "personal":
        return "UserIcon";
      case "home":
        return "HomeIcon";
      case "medical":
        return "PlusIcon";
      default:
        return "DocumentIcon";
    }
  };

  return (
    <div
      className={`bg-card border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-primary border-primary" : "border-border"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(request.id)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <div className="flex items-center space-x-3">
            <AppImage
              src={request.studentImage}
              alt={request.studentImageAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <Link
                href={`/student-profile?id=${request.studentId}`}
                className="font-medium text-text-primary hover:text-primary transition-colors duration-200"
              >
                {request.studentName}
              </Link>
              <p className="text-xs text-text-secondary">
                {request.department}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {request.priority !== "low" && (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                request.priority
              )}`}
            >
              {request.priority.toUpperCase()}
            </span>
          )}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
              request.status
            )}`}
          >
            {request.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Leave Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <Icon
            name={getLeaveTypeIcon(request.leaveType) as any}
            size={16}
            className="text-text-secondary"
          />
          <span className="text-sm text-text-secondary">Type:</span>
          <span className="text-sm font-medium text-text-primary capitalize">
            {request.leaveType}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Icon
            name="CalendarDaysIcon"
            size={16}
            className="text-text-secondary"
          />
          <span className="text-sm text-text-secondary">Duration:</span>
          <span className="text-sm font-medium text-text-primary">
            {request.duration} days
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="ClockIcon" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">From:</span>
          <span className="text-sm font-medium text-text-primary">
            {request.startDate}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="ClockIcon" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">To:</span>
          <span className="text-sm font-medium text-text-primary">
            {request.endDate}
          </span>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-4">
        <p className="text-sm text-text-secondary mb-1">Reason:</p>
        <p className="text-sm text-text-primary bg-muted p-2 rounded">
          {request.reason}
        </p>
      </div>

      {/* Documents */}
      {request.documents && request.documents.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <Icon
            name="PaperClipIcon"
            size={16}
            className="text-text-secondary"
          />
          <span className="text-sm text-text-secondary">
            {request.documents.length} document(s) attached
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="ClockIcon" size={14} className="text-text-secondary" />
          <span className="text-xs text-text-secondary">
            Submitted: {request.submittedAt}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewDetails(request.id)}
            className="px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-colors duration-200"
          >
            View Details
          </button>

          {request.status === "pending" && (
            <>
              <button
                onClick={() => onReject(request.id)}
                className="px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10 rounded transition-colors duration-200"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove(request.id)}
                className="px-3 py-1 text-xs font-medium bg-success text-success-foreground hover:bg-success/90 rounded transition-colors duration-200"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
