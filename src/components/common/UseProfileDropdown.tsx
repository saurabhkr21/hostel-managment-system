'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface UserProfileDropdownProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onSignOut?: () => void;
  className?: string;
}

interface MenuItem {
  label: string;
  path?: string;
  icon: string;
  onClick?: () => void;
  divider?: boolean;
}

const UserProfileDropdown = ({ 
  user = {
    name: 'Admin User',
    email: 'admin@hostelhub.com',
    role: 'Administrator'
  },
  onSignOut,
  className = ''
}: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: 'View Profile', path: '/profile', icon: 'UserIcon' },
    { label: 'Account Settings', path: '/settings', icon: 'CogIcon' },
    { label: 'Preferences', path: '/preferences', icon: 'AdjustmentsHorizontalIcon' },
    { label: 'Help & Support', path: '/help', icon: 'QuestionMarkCircleIcon' },
    { label: 'Sign Out', icon: 'ArrowRightOnRectangleIcon', onClick: handleSignOut, divider: true }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSignOut() {
    setIsOpen(false);
    if (onSignOut) {
      onSignOut();
    } else {
      // Default sign out behavior
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  }

  const handleMenuClick = (item: MenuItem) => {
    setIsOpen(false);
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 hover:bg-accent rounded-md transition-colors duration-200 w-full text-left"
      >
        <div className="relative">
          {user.avatar ? (
            <AppImage
              src={user.avatar}
              alt={`${user.name} avatar`}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="UserIcon" size={16} className="text-secondary-foreground" />
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-surface rounded-full"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
          <p className="text-xs text-text-secondary truncate">{user.role}</p>
        </div>
        
        <Icon 
          name="ChevronDownIcon" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 dropdown-shadow rounded-md py-2 bg-popover">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-popover-foreground">{user.name}</p>
            <p className="text-xs text-text-secondary">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider && <div className="my-1 border-t border-border" />}
                
                {item.path ? (
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors duration-200"
                  >
                    <Icon name={item.icon as any} size={16} className="mr-3 text-text-secondary" />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="w-full flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors duration-200 text-left"
                  >
                    <Icon name={item.icon as any} size={16} className="mr-3 text-text-secondary" />
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;