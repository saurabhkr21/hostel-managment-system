"use client";

import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface CommunicationRecord {
  id: string;
  type: "automated" | "manual" | "alert";
  subject: string;
  message: string;
  timestamp: string;
  recipient: string;
  status: "sent" | "delivered" | "read" | "failed";
  category:
    | "attendance"
    | "leave"
    | "behavior"
    | "academic"
    | "health"
    | "general";
  priority: "low" | "medium" | "high" | "urgent";
}

interface ParentCommunicationsTabProps {
  communications: CommunicationRecord[];
}

const ParentCommunicationsTab = ({
  communications,
}: ParentCommunicationsTabProps) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedCommunication, setSelectedCommunication] =
    useState<CommunicationRecord | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "automated":
        return "bg-blue-100 text-blue-800";
      case "manual":
        return "bg-green-100 text-green-800";
      case "alert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "automated":
        return "CogIcon";
      case "manual":
        return "UserIcon";
      case "alert":
        return "ExclamationTriangleIcon";
      default:
        return "EnvelopeIcon";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "read":
        return "bg-success text-success-foreground";
      case "failed":
        return "bg-error text-error-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return "PaperAirplaneIcon";
      case "delivered":
        return "CheckIcon";
      case "read":
        return "EyeIcon";
      case "failed":
        return "XMarkIcon";
      default:
        return "QuestionMarkCircleIcon";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-text-secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "attendance":
        return "ClipboardDocumentCheckIcon";
      case "leave":
        return "CalendarDaysIcon";
      case "behavior":
        return "FaceSmileIcon";
      case "academic":
        return "AcademicCapIcon";
      case "health":
        return "HeartIcon";
      case "general":
        return "InformationCircleIcon";
      default:
        return "EnvelopeIcon";
    }
  };

  const filteredCommunications = communications.filter((comm) => {
    const typeMatch = filterType === "all" || comm.type === filterType;
    const categoryMatch =
      filterCategory === "all" || comm.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  const totalCommunications = communications.length;
  const automatedCount = communications.filter(
    (c) => c.type === "automated"
  ).length;
  const manualCount = communications.filter((c) => c.type === "manual").length;
  const alertCount = communications.filter((c) => c.type === "alert").length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {totalCommunications}
          </div>
          <div className="text-sm text-text-secondary">Total Messages</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {automatedCount}
          </div>
          <div className="text-sm text-text-secondary">Automated</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {manualCount}
          </div>
          <div className="text-sm text-text-secondary">Manual</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {alertCount}
          </div>
          <div className="text-sm text-text-secondary">Alerts</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Message Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-border 
              rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="automated">Automated</option>
              <option value="manual">Manual</option>
              <option value="alert">Alert</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border 
              rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="attendance">Attendance</option>
              <option value="leave">Leave</option>
              <option value="behavior">Behavior</option>
              <option value="academic">Academic</option>
              <option value="health">Health</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
      </div>

      {/* Communications List */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Icon name="ChatBubbleLeftRightIcon" size={20} />
            Communication History ({filteredCommunications.length})
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 
          bg-primary text-primary-foreground rounded-md hover:bg-primary/90 
          transition-colors duration-200">
            <Icon name="PlusIcon" size={16} />
            Send Message
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredCommunications.length === 0 ? (
            <div className="text-center py-8">
              <Icon
                name="ChatBubbleLeftRightIcon"
                size={48}
                className="mx-auto text-text-secondary mb-4"
              />
              <p className="text-text-secondary">
                No communications found matching the selected filters.
              </p>
            </div>
          ) : (
            filteredCommunications.map((comm) => (
              <div
                key={comm.id}
                className="border border-border rounded-lg p-4 hover:bg-accent/50 
                transition-colors duration-200 cursor-pointer"
                onClick={() => setSelectedCommunication(comm)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${getTypeColor(comm.type)}`}
                    >
                      <Icon name={getTypeIcon(comm.type) as any} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-text-primary truncate">
                          {comm.subject}
                        </h4>
                        <Icon
                          name={getCategoryIcon(comm.category) as any}
                          size={14}
                          className="text-text-secondary shrink-0"
                        />
                        <span
                          className={`text-xs font-medium ${getPriorityColor(
                            comm.priority
                          )}`}
                        >
                          {comm.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                        {comm.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-secondary">
                        <span>To: {comm.recipient}</span>
                        <span>{new Date(comm.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                      comm.status
                    )}`}
                  >
                    <Icon name={getStatusIcon(comm.status) as any} size={12} />
                    {comm.status.charAt(0).toUpperCase() + comm.status.slice(1)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Communication Templates */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="DocumentDuplicateIcon" size={20} />
          Quick Message Templates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200 text-left">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Icon name="ClipboardDocumentCheckIcon" size={16} />
            </div>
            <div>
              <p className="font-medium text-text-primary">Attendance Update</p>
              <p className="text-sm text-text-secondary">
                Daily attendance summary
              </p>
            </div>
          </button>

          <button className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200 text-left">
            <div className="p-2 bg-green-100 text-green-800 rounded-lg">
              <Icon name="FaceSmileIcon" size={16} />
            </div>
            <div>
              <p className="font-medium text-text-primary">Positive Behavior</p>
              <p className="text-sm text-text-secondary">
                Good behavior recognition
              </p>
            </div>
          </button>

          <button className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200 text-left">
            <div className="p-2 bg-yellow-100 text-yellow-800 rounded-lg">
              <Icon name="ExclamationTriangleIcon" size={16} />
            </div>
            <div>
              <p className="font-medium text-text-primary">Concern Notice</p>
              <p className="text-sm text-text-secondary">Address concerns</p>
            </div>
          </button>

          <button className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200 text-left">
            <div className="p-2 bg-purple-100 text-purple-800 rounded-lg">
              <Icon name="AcademicCapIcon" size={16} />
            </div>
            <div>
              <p className="font-medium text-text-primary">Academic Progress</p>
              <p className="text-sm text-text-secondary">
                Study performance update
              </p>
            </div>
          </button>

          <button className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200 text-left">
            <div className="p-2 bg-red-100 text-red-800 rounded-lg">
              <Icon name="HeartIcon" size={16} />
            </div>
            <div>
              <p className="font-medium text-text-primary">Health Alert</p>
              <p className="text-sm text-text-secondary">Medical concerns</p>
            </div>
          </button>

          <button className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200 text-left">
            <div className="p-2 bg-gray-100 text-gray-800 rounded-lg">
              <Icon name="InformationCircleIcon" size={16} />
            </div>
            <div>
              <p className="font-medium text-text-primary">General Update</p>
              <p className="text-sm text-text-secondary">General information</p>
            </div>
          </button>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedCommunication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  Message Details
                </h3>
                <button
                  onClick={() => setSelectedCommunication(null)}
                  className="p-2 hover:bg-accent rounded-md transition-colors duration-200"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                    selectedCommunication.type
                  )}`}
                >
                  {selectedCommunication.type.charAt(0).toUpperCase() +
                    selectedCommunication.type.slice(1)}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    selectedCommunication.status
                  )}`}
                >
                  {selectedCommunication.status.charAt(0).toUpperCase() +
                    selectedCommunication.status.slice(1)}
                </div>
                <span
                  className={`text-sm font-medium ${getPriorityColor(
                    selectedCommunication.priority
                  )}`}
                >
                  {selectedCommunication.priority.toUpperCase()} PRIORITY
                </span>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-2">Subject</h4>
                <p className="text-text-secondary">
                  {selectedCommunication.subject}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-2">Message</h4>
                <p className="text-text-secondary whitespace-pre-wrap">
                  {selectedCommunication.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Recipient
                  </h4>
                  <p className="text-text-secondary">
                    {selectedCommunication.recipient}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Sent</h4>
                  <p className="text-text-secondary">
                    {new Date(selectedCommunication.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentCommunicationsTab;
