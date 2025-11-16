'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbTrailProps {
  customItems?: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbTrail = ({ customItems, className = '' }: BreadcrumbTrailProps) => {
  const pathname = usePathname();

  const getDefaultBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/admin-dashboard' }
    ];

    if (pathname === '/admin-dashboard' || pathname === '/') {
      return [{ label: 'Dashboard', path: '/admin-dashboard', isActive: true }];
    }

    const routeMap: Record<string, string> = {
      'student-management': 'Students',
      'student-profile': 'Student Profile',
      'attendance-tracking': 'Attendance',
      'leave-management': 'Leave Management',
      'settings': 'Settings',
      'reports': 'Reports',
      'help': 'Help & Support',
      'profile': 'Profile Settings',
      'preferences': 'Preferences'
    };

    pathSegments.forEach((segment, index) => {
      const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const isActive = index === pathSegments.length - 1;
      
      breadcrumbs.push({ label, path, isActive });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRightIcon" 
                size={16} 
                className="breadcrumb-separator" 
              />
            )}
            
            {item.isActive ? (
              <span className="breadcrumb-item text-text-primary font-medium cursor-default">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.path}
                className="breadcrumb-item hover:text-primary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;