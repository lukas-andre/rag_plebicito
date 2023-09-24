import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sidebarButtonVariants = cva(
  'flex items-center space-x-2 p-4 w-full rounded-md transition-colors focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700',
  {
    variants: {
      state: {
        active: 'bg-gray-400 text-white',
        inactive: 'hover:bg-gray-200',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  }
);

export interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarButtonVariants> {
  icon: React.ReactNode;
  label: string;
}

const SidebarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ icon, label, state, className, ...props }, ref) => {
    return (
      <button
        className={cn(sidebarButtonVariants({ state, className }))}
        ref={ref}
        {...props}
      >
        <span className='flex-shrink-0'>{icon}</span>
        <span className='flex-grow text-left'>{label}</span>
      </button>
    );
  }
);

SidebarButton.displayName = 'SidebarButton';

export default SidebarButton;
