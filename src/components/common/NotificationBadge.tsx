'use client';

import React from 'react';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
  showZero?: boolean;
}

const NotificationBadge = ({ 
  count, 
  maxCount = 99, 
  size = 'md',
  variant = 'default',
  className = '',
  showZero = false
}: NotificationBadgeProps) => {
  if (count === 0 && !showZero) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-xs',
    lg: 'h-6 w-6 text-sm'
  };

  const variantClasses = {
    default: 'bg-destructive text-destructive-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground'
  };

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-full font-medium
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;