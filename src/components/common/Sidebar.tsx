"use client";

import Icon from "@/components/ui/AppIcon";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // Assuming you created this hook
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// --- Types and Data ---

// For type-safety, define the available icon names
type HeroIconName =
  | "HomeIcon"
  | "UserGroupIcon"
  | "ClipboardDocumentCheckIcon"
  | "CalendarDaysIcon"
  | "UserIcon"
  | "Bars3Icon"
  | "XMarkIcon"
  | "ChevronLeftIcon"
  | "ChevronRightIcon";

interface NavigationItem {
  label: string;
  path: string;
  icon: HeroIconName;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", path: "/admin-dashboard", icon: "HomeIcon", badge: 3 },
  { label: "Students", path: "/student-management", icon: "UserGroupIcon" },
  {
    label: "Attendance",
    path: "/attendance-tracking",
    icon: "ClipboardDocumentCheckIcon",
    badge: 5,
  },
  {
    label: "Leave Management",
    path: "/leave-management",
    icon: "CalendarDaysIcon",
    badge: 2,
  },
];

// --- Sub-components ---

const SidebarLogo = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div
    className={clsx("flex items-center ", {
      "justify-center": isCollapsed,
    })}
  >
    <div className="flex w-8 h-8 bg-primary rounded-lg items-center justify-center shrink-0">
      <span className="text-primary-foreground font-bold text-sm">H</span>
    </div>
    {!isCollapsed && (
      <div className="flex flex-col p-1 items-center justify-center">
        <span className="text-lg font-semibold text-text-primary">
          HostelHub
        </span>
        <span className="text-xs  text-text-secondary mb-1">Management System</span>
      </div>
    )}
  </div>
);

const NavItem = ({
  item,
  isCollapsed,
  isActive,
  onClick,
}: {
  item: NavigationItem;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Link
    href={item.path}
    onClick={onClick}
    className={clsx("nav-item relative", {
      "nav-item-active": isActive,
      "nav-item-inactive": !isActive,
      "justify-center px-2": isCollapsed,
    })}
    aria-current={isActive ? "page" : undefined}
  >
    <Icon name={item.icon} size={20} className="shrink-0" />
    {!isCollapsed && (
      <>
        <span className="ml-3">{item.label}</span>
        {item.badge && item.badge > 0 && (
          <span className="ml-auto inline-flex items-center justify-center px-2
           py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {item.badge > 99 ? "99+" : item.badge}
          </span>
        )}
      </>
    )}
    {isCollapsed && item.badge && item.badge > 0 && (
      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
    )}
  </Link>
);

const UserProfile = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div
    className={clsx("flex items-center", {
      "justify-center": isCollapsed,
      "space-x-3": !isCollapsed,
    })}
  >
    <div className="flex w-8 h-8 bg-secondary rounded-full items-center justify-center shrink-0">
      <Icon name="UserIcon" size={16} className="text-secondary-foreground" />
    </div>
    {!isCollapsed && (
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          Admin User
        </p>
        <p className="text-xs text-text-secondary truncate">administrator</p>
      </div>
    )}
  </div>
);

// --- Main Sidebar Component ---

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({
  isCollapsed: isDesktopCollapsed = false,
  onToggle: onDesktopToggle,
}: SidebarProps) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isCollapsed = isMobile ? false : isDesktopCollapsed;

  // Memoize active path check for performance
  const isActive = useMemo(
    () => (path: string) => {
      if (path === "/admin-dashboard")
        return pathname === path || pathname === "/";
      return pathname.startsWith(path);
    },
    [pathname]
  );

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow =
      isMobile && isMobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isMobileOpen]);

  const handleToggle = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      onDesktopToggle?.();
    }
  };

  const handleLinkClick = () => {
    if (isMobile) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Header & Overlay */}
      {isMobile && (
        <>
          <div className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border flex px-4 z-20 md:hidden">
            <SidebarLogo isCollapsed={false} />
            <button
              onClick={handleToggle}
              className="p-2 rounded-md hover:bg-accent"
            >
              <Icon name="Bars3Icon" size={24} />
            </button>
          </div>
          {isMobileOpen && (
            <div
              className="fixed inset-0 bg-black/60 blur z-30"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
        </>
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          "sidebar-transition fixed top-0 left-0 h-full bg-surface border-r border-border shadow-md flex flex-col transform transition-transform duration-300 ease-in-out",
          {
            "z-40 w-72 transform translate-x-0": isMobile && isMobileOpen,
            "z-40 w-72 transform -translate-x-full": isMobile && !isMobileOpen,
            "z-10 w-60": !isMobile && !isDesktopCollapsed,
            "z-10 w-20": !isMobile && isDesktopCollapsed,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={clsx(
              "flex items-center border-b  px-3 py-3",
              { "px-1": isCollapsed }
            )}
          >
            {isMobile ? (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-md hover:bg-accent"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            ) : null}
            {!isMobile && <SidebarLogo isCollapsed={isCollapsed} />}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                isCollapsed={isCollapsed}
                isActive={isActive(item.path)}
                onClick={handleLinkClick}
              />
            ))}
          </nav>

          {/* Footer Profile */}
          <div
            className={clsx("border-t border-border p-4", {
              "px-2": isCollapsed,
            })}
          >
            <UserProfile isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>

      {/* Desktop Toggle Button */}
      {!isMobile && (
        <button
          onClick={onDesktopToggle}
          className={clsx(
            "fixed top-6 bg-surface border border-border rounded-full p-1.5 shadow-sm hover:shadow-md transition-all duration-300 z-10",
            {
              "left-[225px]": !isDesktopCollapsed,
              "left-[65px]": isDesktopCollapsed,
            }
          )}
          aria-label={
            isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          <Icon
            name={isDesktopCollapsed ? "ChevronRightIcon" : "ChevronLeftIcon"}
            size={16}
          />
        </button>
      )}
    </>
  );
};

export default Sidebar;
