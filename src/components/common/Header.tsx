"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/AppIcon";

interface HeaderProps {
  sidebarCollapsed ?: boolean;
}

interface NavigationItem {
  label: string;
  path: string;
  badge?: number;
}

interface DropdownItem {
  label: string;
  path: string;
  icon: string;
}

const Header = ({ sidebarCollapsed = false }: HeaderProps) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const primaryNavigation: NavigationItem[] = [
    { label: "Dashboard", path: "/admin-dashboard", badge: 3 },
    { label: "Students", path: "/student-management" },
    { label: "Attendance", path: "/attendance-tracking", badge: 5 },
    { label: "Leave Management", path: "/leave-management", badge: 2 },
  ];

  const secondaryNavigation: DropdownItem[] = [
    { label: "Settings", path: "/settings", icon: "CogIcon" },
    { label: "Reports", path: "/reports", icon: "DocumentChartBarIcon" },
    { label: "Help & Support", path: "/help", icon: "QuestionMarkCircleIcon" },
  ];

  const profileMenuItems: DropdownItem[] = [
    { label: "Profile Settings", path: "/profile", icon: "UserIcon" },
    {
      label: "Preferences",
      path: "/preferences",
      icon: "AdjustmentsHorizontalIcon",
    },
    { label: "Sign Out", path: "/login", icon: "ArrowRightOnRectangleIcon" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === "/admin-dashboard") {
      return pathname === path || pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const getPageTitle = () => {
    const currentNav = primaryNavigation.find((item) => isActive(item.path));
    if (currentNav) return currentNav.label;

    switch (pathname) {
      case "/student-profile":
        return "Student Profile";
      case "/settings":
        return "Settings";
      case "/reports":
        return "Reports";
      case "/help":
        return "Help & Support";
      default:
        return "Dashboard";
    }
  };

  return (
    <header
      className={`
        flex fixed top-0 right-0 h-16 bg-surface justify-between border-b border-border z-100 transition-all duration-300
        ${
          sidebarCollapsed ? "left-16" : "left-240"
        } md:left-0 md:right-0 md:pl-60
      `}
    >
      <div className="flex  h-full px-6">
        {/* Left Section - Page Title & Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-text-primary">
              {getPageTitle()}
            </h1>
            {pathname !== "/admin-dashboard" && pathname !== "/" && (
              <div className="hidden md:flex items-center space-x-1 text-sm text-text-secondary">
                <Link
                  href="/admin-dashboard"
                  className="hover:text-text-primary transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Icon name="ChevronRightIcon" size={16} />
                <span className="text-text-primary">{getPageTitle()}</span>
              </div>
            )}
          </div>

          {/* Primary Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-6">
            {primaryNavigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  relative flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-accent"
                  }
                `}
              >
                {item.label}
                {item.badge && item.badge > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-4">
          {/* More Menu Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-accent rounded-md transition-colors duration-200"
            >
              <span className="hidden sm:inline mr-2">More</span>
              <Icon name="EllipsisHorizontalIcon" size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 dropdown-shadow rounded-md py-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-accent transition-colors duration-200"
                  >
                    <Icon name={item.icon as any} size={16} className="mr-3" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-accent rounded-md transition-colors duration-200">
            <Icon name="BellIcon" size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-3 p-2 hover:bg-accent rounded-md transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon
                  name="UserIcon"
                  size={16}
                  className="text-secondary-foreground"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text-primary">
                  Admin User
                </p>
                <p className="text-xs text-text-secondary">administrator</p>
              </div>
              <Icon
                name="ChevronDownIcon"
                size={16}
                className="text-text-secondary"
              />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 dropdown-shadow rounded-md py-1">
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-accent transition-colors duration-200"
                  >
                    <Icon name={item.icon as any} size={16} className="mr-3" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
