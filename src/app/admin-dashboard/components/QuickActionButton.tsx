import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface QuickActionButtonProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

const QuickActionButton = ({ 
  title, 
  description, 
  icon, 
  href, 
  onClick, 
  variant = 'primary' 
}: QuickActionButtonProps) => {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  };

  const content = (
    <div className={`p-4 rounded-lg transition-colors duration-200 ${variantClasses[variant]}`}>
      <div className="flex items-center space-x-3">
        <Icon name={icon as any} size={20} />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
};

export default QuickActionButton;