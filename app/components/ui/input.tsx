import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const baseStyles = `
      flex h-10 w-full rounded-md py-2 px-3 text-sm placeholder:text-placeholder 
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50
      bg-card-background text-typography border border-border-color
    `;
    const computedClassName = cn(baseStyles, className);

    return <input className={computedClassName} ref={ref} {...props} />;
  }
);
Input.displayName = 'Input';

export { Input };
