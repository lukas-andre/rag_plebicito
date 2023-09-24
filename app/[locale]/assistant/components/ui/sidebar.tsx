import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React from 'react';

const sidebarVariants = cva(
  'flex flex-col h-screen w-screen transition-colors duration-300',
  {
    variants: {
      position: {
        left: 'w-64 bg-gray-200',
        right: 'w-64 bg-gray-300',
      },
      theme: {
        light: 'text-black',
        dark: 'bg-gray-900 text-white',
      },
    },
    defaultVariants: {
      position: 'left',
      theme: 'light',
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, theme, ...props }, ref) => {
    return (
      <div
        className={cn(sidebarVariants({ theme, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Sidebar.displayName = 'Sidebar';

export { Sidebar, sidebarVariants };
