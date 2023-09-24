import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ title, className, ...props }, ref) => {
    return (
      <div
        className={cn('border-b border-gray-400 bg-gray-300 p-4', className)}
        ref={ref}
        {...props}
      >
        <h1 className='text-lg font-bold'>{title}</h1>
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

export default SidebarHeader;
